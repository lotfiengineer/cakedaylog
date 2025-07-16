"use client";
import { getQueryClient } from "@/lib/react-query/get-query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";

const ReactQueryProvider = ({ children }: PropsWithChildren) => {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryProvider;
