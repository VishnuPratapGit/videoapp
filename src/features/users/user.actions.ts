'use server'

import { z } from "zod";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/src/lib/db";
import { User } from "./user.schema";

const createUserInputSchema = z.object({
  username: z.string().trim().min(3),
  email: z.email(),
  password: z.string().min(8),
});

type CreateUserInput = z.infer<typeof createUserInputSchema>;

const signInUserInputSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

type SignInUserInput = z.infer<typeof signInUserInputSchema>;

type AuthUser = {
  id: string;
  name: string;
  email: string;
};

export async function createNewUser(formData: CreateUserInput) {
  try {
    const parsedUserData = createUserInputSchema.safeParse(formData);

    if (!parsedUserData.success) {
      return {
        success: false,
        error: parsedUserData.error.issues[0]?.message || "Invalid user data.",
      };
    }

    const { username, email, password } = parsedUserData.data;

    await dbConnect();

    const existingUser = await User.exists({ email });

    if (existingUser) {
      return { success: false, error: "Email is already registered." };
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const userObject = newUser.toObject({
      transform: (_doc, ret) => {
        delete (ret as Record<string, unknown>).password;
        return ret;
      },
    });

    return {
      success: true,
      data: JSON.parse(JSON.stringify(userObject)),
    };
  } catch (error) {
    console.error("Failed to insert user:", error);

    return {
      success: false,
      error: error instanceof Error ? error.message : "An unexpected error occurred.",
    };
  }
}

export async function signInUser(formData: SignInUserInput): Promise<AuthUser | null> {
  try {
    const parsedUserData = signInUserInputSchema.safeParse(formData);

    if (!parsedUserData.success) {
      return null;
    }

    const { email, password } = parsedUserData.data;

    await dbConnect();

    const user = await User.findOne({ email });

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return null;
    }

    return {
      id: user._id.toString(),
      name: user.username,
      email: user.email,
    };
  } catch (error) {
    console.error("Failed to sign in user:", error);
    return null;
  }
}
