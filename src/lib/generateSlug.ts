'use server'

import crypto from "crypto";
import { User } from "../features/users/user.schema";
import { Channel } from "../features/channels/channels.schema";
import { dbConnect } from "./db";

export async function buildBaseSlug(displayName: string) {
  return displayName
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9._]/g, "")
    .slice(0, 20);
}

export async function buildSlugWithSuffix(base: string) {
  const unique = crypto.randomUUID().replace(/-/g, "").slice(0, 8);
  return `@${base}_${unique}`;
}

export async function generateUniqueSlug(displayName: string | undefined) {
  if(!displayName) return;
  
  await dbConnect(); 
  const base = await buildBaseSlug(displayName);
  const isTaken = await User.exists({ handle: "@" + base });
  const isHandleExistsInChannel = await Channel.exists({handle: "@" + base});
  
  if (!isTaken && !isHandleExistsInChannel) return "@" + base;
  return buildSlugWithSuffix(base);
}

