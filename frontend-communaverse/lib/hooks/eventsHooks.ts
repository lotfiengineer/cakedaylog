import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../axios";
import { Event } from "../types/event";
import getQueryClient from "../react-query/getQueryClient";
import { EventSchemaType } from "../schemas/event.schema";

const getAllEvents = async (communityId: string) => {
  const response = await axiosInstance.get<Event[]>(`/events/${communityId}`);
  return response.data;
};

export const useAllEvents = ({ communityId }: { communityId: string }) => {
  return useQuery({
    queryKey: ["events", communityId],
    queryFn: () => getAllEvents(communityId),
  });
};

const deleteEvent = async (eventId: string) => {
  const response = await axiosInstance.delete(`/events/${eventId}`);
  return response.data;
};

export const useDeleteEvent = ({ communityId }: { communityId: string }) => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: (eventId: string) => deleteEvent(eventId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["events", communityId],
      });
    },
  });
};

export const useCreateEvent = ({ communityId }: { communityId: string }) => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: (data: EventSchemaType) =>  axiosInstance.post(`/events`, data),
    onSettled: () => {
            queryClient.invalidateQueries({
        queryKey: ["events", communityId],
      });
    }
  });
};
