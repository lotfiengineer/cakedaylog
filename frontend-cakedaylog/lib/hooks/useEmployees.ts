import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Employee } from "../types/employee";
import { getQueryClient } from "@/lib/react-query/get-query-client";
import { EmployeeSchemaType } from "../schemas/employee.schema";
import { axiosInstance } from "@/lib/axios";

const getEmployees = async () => {
  const response = await axiosInstance.get<Employee[]>("/employees");
  return response.data;
};

const addEmployee = async (employeeData: EmployeeSchemaType) => {
  const response = await axiosInstance.post<Employee>(
    "/employees",
    employeeData
  );
  return response.data;
};

const deleteEmployee = async (id: string) => {
  const response = await axiosInstance.delete<Employee>(`/employees/${id}`);
  return response.data._id;
};

const useEmployees = () => {
  return useQuery({
    queryKey: ["employees"],
    queryFn: getEmployees,
  });
};

export const prefetchEmployees = async () => {
  const queryClient = getQueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: ["employees"],
      queryFn: getEmployees,
    });
  } catch (error) {
    console.error("Error prefetching employees:", error);
  }

  return queryClient;
};

export const useAddEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addEmployee,
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: ["employees"],
      }),
  });
};

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteEmployee,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });
};

export default useEmployees;
