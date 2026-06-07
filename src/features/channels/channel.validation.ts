import * as z from 'zod'

export const ChannelZodSchema = z.object({
  name: z.string().min(3, "Channel name must be at least 3 characters"),
  handle: z
    .string()
    .min(4, "Handle must be at least 3 characters")
    .toLowerCase(),
});