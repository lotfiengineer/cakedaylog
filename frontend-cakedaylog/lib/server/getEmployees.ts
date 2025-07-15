import { Employee } from "@/app/types/employee";
import { axiosInstance } from "@/lib/axios";

export async function getEmployees(): Promise<Employee[]> {
  const res = await axiosInstance.get<Employee[]>("/employees");
  return res.data;
}
