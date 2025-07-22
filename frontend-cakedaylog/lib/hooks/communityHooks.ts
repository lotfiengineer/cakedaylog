"use client";

import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../axios";
import { Community } from "../types/community";
import { CommunitySchemaType } from "../schemas/community.schema";
import { useRouter } from "next/navigation";

export const useCreateCommunity = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async ({ community }: { community: CommunitySchemaType }) =>
      axiosInstance.post<Community>("/communities", community),
    onSettled: (data) => {
      if (data) {
        router.push(`community/${data.data._id}/members`);
      }
    },
  });
};
