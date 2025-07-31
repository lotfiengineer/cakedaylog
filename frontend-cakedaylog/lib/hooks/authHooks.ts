"use client";

import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../axios";
import { UserRequest, UserResponse } from "../types/user";
import { queryKeys } from "../react-query/queryKeys";
import { useRouter } from "next/navigation";
import LocalStorageService from "../localStorageService";

const login = async (userRequest: UserRequest) => {
  const response = await axiosInstance.post<UserResponse>(
    "http://localhost:3770/api/auth/login",
    userRequest
  );

  return response.data;
};

export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: queryKeys.auth.login,
    mutationFn: login,
    onSettled: (data) => {
      LocalStorageService.setItem("token", data?.token ?? "");
      LocalStorageService.setItem("email", data?.user.email ?? "");
      LocalStorageService.setItem("userId", data?.user.id ?? "");
      router.back();
    },
  });
};
