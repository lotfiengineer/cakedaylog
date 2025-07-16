import { z } from "zod";

export const EmployeeSchema = z.object({
  firstname: z.string().min(2),
  lastname: z.string().min(2),
  birthdate: z.date(),
});

export type EmployeeSchemaType = z.infer<typeof EmployeeSchema>;
