"use server";

import { dbConnect } from "@/src/lib/db";
import * as z from "zod";
import slugify from "slugify";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import { Channel } from "@/src/models/Channels";
import { User } from "@/src/models/User";

const ChannelZodSchema = z.object({
  name: z.string().min(3, "Channel name must be at least 3 characters"),
  handle: z
    .string()
    .min(3, "Handle must be at least 3 characters")
    .toLowerCase(),
});

export async function checkHandleUnique(value: string) {
  try {
    const result = ChannelZodSchema.shape.handle.safeParse(value);
    if (!result?.success) {
      return { success: false, message: result.error.issues[0].message };
    }

    await dbConnect();

    const sanitizedHandle = result?.data?.toLowerCase().trim();

    const isHandleExistsInChannels = await Channel.exists({
      handle: sanitizedHandle,
    });
    const isHandleExistsInUsers = await User.exists({
      handle: sanitizedHandle,
    });

    if (isHandleExistsInChannels || isHandleExistsInUsers) {
      return {
        success: false,
        message: "Handle already exists",
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error checking handle:", error);
    return { success: false, message: "Server database error" };
  }
}

export async function createChannel({
  name,
  handle,
  avatar,
}: {
  name: string;
  handle: string;
  avatar?: string | null;
}) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { success: false, message: "Unauthorized. Please log in again." };
    }

    const validation = ChannelZodSchema.safeParse({ name, handle });
    if (!validation.success) {
      return { success: false, message: validation.error.issues[0].message };
    }

    await dbConnect();

    const channelExists = await Channel?.exists({
      name: { $regex: new RegExp(`^${name.trim()}$`, "i") },
    });
    ``;
    if (channelExists) {
      return {
        success: false,
        message: "Channel with this name is already exists",
      };
    }

    const sanitizedHandle = handle.toLowerCase().trim();
    const handleCheck = await checkHandleUnique(sanitizedHandle);
    if (!handleCheck.success) {
      return { success: false, message: handleCheck.message };
    }

    const channelUrl = slugify(name, { lower: true, strict: true });

    const newChannel = await Channel?.create({
      name: name.trim(),
      handle: sanitizedHandle,
      avatar,
      channelUrl,
      userId: session?.user?.id,
    });

    return {
      success: true,
      message: "Channel created successfully",
      data: JSON.parse(JSON.stringify(newChannel)),
    };
  } catch (error) {
    console.error("Fatal error creating channel:", error);
    return {
      success: false,
      message: "Something went wrong on our end. Please try again.",
      error: error,
    };
  }
}
