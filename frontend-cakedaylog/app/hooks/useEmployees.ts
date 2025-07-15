import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/react-query/fetcher";
import { Employee } from "../types/employee";

export const useEmployees = (initialData?: Employee[]) => {
  return useQuery({
    queryKey: ["employees"],
    queryFn: () => fetcher<Employee[]>("/employees"),
    initialData,
  });
};
