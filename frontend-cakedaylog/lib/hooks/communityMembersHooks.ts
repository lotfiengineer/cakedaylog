import { useMutation, useQuery } from "@tanstack/react-query";
import { Member } from "@/lib/types/member";
import { MemberSchemaType } from "@/lib/schemas/member.schema";
import { axiosInstance } from "@/lib/axios";
import getQueryClient from "@/lib/react-query/getQueryClient";
import { queryKeys } from "@/lib/react-query/queryKeys";
import { Community } from "@/lib/types/community";

const apis = {
  communities: "/communities",
};

export const getAllCommunities = async () => {
  const response = await axiosInstance.get<Community[]>(
    `${apis.communities}/all`
  );
  return response.data;
};

export const getCommunityById = async (id: string) => {
  const response = await axiosInstance.get<Community>(
    `${apis.communities}/all/${id}`
  );
  return response.data;
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

//** Hooks */

// export const useCommunities = () => {
//   return useQuery({
//     queryKey: queryKeys.community.all,
//     queryFn: getAllCommunities,
//   });
// };

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
