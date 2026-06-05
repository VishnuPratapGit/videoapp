'use server'

import { dbConnect } from "@/src/lib/db";
import * as z from 'zod'
import { User } from "../users/user.schema";

const ChannelZodSchema = z.object({
  handle: z.string().min(3, "Handle must be at least 3 characters"),
});

export async function checkHandleUnique(value: string) {
    try {
        await dbConnect();
        
        const result = ChannelZodSchema.safeParse({handle: value});
        if(!result?.success) {
            const errorMessage = result.error?.issues?.[0]?.message || 'Zod Error';
            return { success: false, message: errorMessage };
        }
        
        const handle = result?.data?.handle;
        const isHandleExists = await User.exists({ slug: handle });
        if(isHandleExists){
            return {
                success: false,
                message: 'Slug already exists'
            }
        }

        return {
            success: true
        }

    } catch (error) {
        console.error(error)   
    }
}