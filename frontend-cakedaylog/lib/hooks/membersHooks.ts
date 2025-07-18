import { useMutation, useQuery } from "@tanstack/react-query";
import { Member } from "../types/member";
import { getQueryClient } from "@/lib/react-query/get-query-client";
import { MemberSchemaType } from "../schemas/member.schema";
import { axiosInstance } from "@/lib/axios";

const apis = {
  communities: "/communities",
};

const getMembers = async () => {
  const response = await axiosInstance.get<Member[]>(apis.communities);
  return response.data;
};

const addMember = async (memberData: MemberSchemaType) => {
  const response = await axiosInstance.post<Member>(
    apis.communities,
    memberData
  );
  return response.data;
};

const deleteEmployee = async (id: string) => {
  const response = await axiosInstance.delete<Member>(
    `${apis.communities}/${id}`
  );
  return response.data._id;
};

export const useMembers = () => {
  return useQuery({
    queryKey: ["employees"],
    queryFn: getMembers,
  });
};

export const prefetchEmployees = async () => {
  const queryClient = getQueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: ["employees"],
      queryFn: getMembers,
    });
  } catch (error) {
    console.error("Error prefetching employees:", error);
  }

  return queryClient;
};

export const useAddEmployee = () => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: addMember,
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: ["employees"],
      }),
  });
};

export const useDeleteEmployee = () => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: deleteEmployee,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });
};

