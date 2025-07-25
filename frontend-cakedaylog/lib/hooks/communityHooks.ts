"use client";

import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../axios";
import { Community } from "../types/community";
import { CommunitySchemaType } from "../schemas/community.schema";
import { useRouter } from "next/navigation";

export const useCreateCommunity = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: ({ community }: { community: CommunitySchemaType }) =>
      axiosInstance.post<Community>("/communities", community),
    onSettled: (data) => {
      if (data) {
        router.push(`community/${data.data._id}/members`);
      }
    },
  });
};

export const useEditCommunity = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: ({
      communityId,
      community,
    }: {
      communityId: string;
      community: CommunitySchemaType;
    }) =>
      axiosInstance.put<Community>(`/communities/${communityId}`, community),
    onSettled: (data) => {
      if (data) {
        router.push("/");
      }
    },
  });
};

export const useDeleteCommunity = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (communityId: string) =>
      axiosInstance.delete<Community>(`/communities/${communityId}`),
    onSettled: (data) => {
      if (data) {
        router.push("/");
      }
    },
  });
};
