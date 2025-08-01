import { z } from "zod";

export const CommunitySchema = z.object({
  name: z.string().min(2),
});

export type CommunitySchemaType = z.infer<typeof CommunitySchema>;
