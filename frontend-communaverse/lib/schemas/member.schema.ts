import { z } from "zod";

export const MemberSchema = z.object({
  firstname: z.string().min(2),
  lastname: z.string().min(2),
  birthdate: z.date(),
});

export type MemberSchemaType = z.infer<typeof MemberSchema>;
