import { useMutation, useQuery } from "@tanstack/react-query";
import { Member } from "@/lib/types/member";
import { MemberSchemaType } from "@/lib/schemas/member.schema";
import { axiosInstance } from "@/lib/axios";
import getQueryClient from "@/lib/react-query/getQueryClient";
import { queryKeys } from "@/lib/react-query/queryKeys";

const apis = {
  communities: "/communities",
};

const getCommunityMembers = async () => {
  const response = await axiosInstance.get<Member[]>(apis.communities);
  return response.data;
};

const addCommunityMember = async (memberData: MemberSchemaType) => {
  const response = await axiosInstance.post<Member>(
    apis.communities,
    memberData
  );
  return response.data;
};

const deleteCommunityMember = async (id: string) => {
  const response = await axiosInstance.delete<Member>(
    `${apis.communities}/${id}`
  );
  return response.data._id;
};

export const useCommunityMembers = () => {
  return useQuery({
    queryKey: queryKeys.community.all,
    queryFn: getCommunityMembers,
  });
};

export const prefetchCommunityMembers = async () => {
  const queryClient = getQueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: queryKeys.community.all,
      queryFn: getCommunityMembers,
    });
  } catch (error) {
    console.error("Error prefetching community members:", error);
  }

  return queryClient;
};

export const useAddCommunityMember = () => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: addCommunityMember,
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: queryKeys.community.all,
      }),
  });
};

export const useDeleteCommunityMember = () => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: deleteCommunityMember,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.community.all });
    },
  });
};
