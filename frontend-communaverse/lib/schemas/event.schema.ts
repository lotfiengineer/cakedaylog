import { z } from "zod";

export const EventSchema = z.object({
  title: z.string().nonempty(),
  description: z.string(),
  communityId: z.string(),
  date: z.date(),
});

export type EventSchemaType = z.infer<typeof EventSchema>;
