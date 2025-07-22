import { useMutation, useQuery } from "@tanstack/react-query";
import { Member } from "@/lib/types/member";
import { MemberSchemaType } from "@/lib/schemas/member.schema";
import { axiosInstance } from "@/lib/axios";
import getQueryClient from "@/lib/react-query/getQueryClient";
import { queryKeys } from "@/lib/react-query/queryKeys";
import { Community } from "@/lib/types/community";

const apis = {
  communities: "/communities",
  communityMembers: (communityId: string) =>
    `/communities/${communityId}/members`,
  // Todo: fix this later
  communityMembersIddsssss: (communityId: string, memberId: string) =>
    `/communities/${communityId}/members/${memberId}`,
};

export const getAllCommunities = async () => {
  const response = await axiosInstance.get<Community[]>(`${apis.communities}`);
  return response.data;
};

const getCommunityMembers = async (communityId: string) => {
  const response = await axiosInstance.get<Member[]>(
    `${apis.communities}/${communityId}/members`
  );
  return response.data;
};

// Todo: Remember this technique. Pass an object to functions you assign to mutationFn
const addCommunityMember = async ({
  memberData,
  communityId,
}: {
  memberData: MemberSchemaType;
  communityId: string;
}) => {
  const response = await axiosInstance.post<Member>(
    apis.communityMembers(communityId),
    memberData
  );
  return response.data;
};

const updateCommunityMember = async ({
  memberData,
  communityId,
  memberId,
}: {
  memberData: MemberSchemaType;
  communityId: string;
  memberId: string;
}) => {
  const response = await axiosInstance.put<Member>(
    apis.communityMembersIddsssss(communityId, memberId),
    memberData
  );

  return response.data._id;
};

const deleteCommunityMember = async ({
  communityId,
  memberId,
}: {
  communityId: string;
  memberId: string;
}) => {
  const response = await axiosInstance.delete<Member>(
    apis.communityMembersIddsssss(communityId, memberId)
  );
  return response.data._id;
};

//** Hooks */

export const useCommunityMembers = (communityId: string) => {
  return useQuery({
    queryKey: queryKeys.community.members.all,
    queryFn: () => getCommunityMembers(communityId),
  });
};

export const getCommunityById = async (communityId: string) => {
  const response = await axiosInstance.get<Community>(
    `/communities/${communityId}`
  );
  return response.data;
};

export const useCommunity = (communityId: string) => {
  return useQuery({
    queryFn: () => getCommunityById(communityId),
    queryKey: queryKeys.community.byId(communityId),
  });
};

export const prefetchCommunityMembers = async (communityId: string) => {
  const queryClient = getQueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: queryKeys.community.members.all,
      queryFn: () => getCommunityMembers(communityId),
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
        queryKey: queryKeys.community.members.all,
      }),
  });
};

export const useUpdateCommunityMember = () => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: updateCommunityMember,
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: queryKeys.community.members.all,
      }),
  });
};

export const useDeleteCommunityMember = () => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: deleteCommunityMember,
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.community.members.all,
      });
    },
  });
};
