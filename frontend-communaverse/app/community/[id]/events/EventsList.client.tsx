"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAllEvents, useDeleteEvent } from "@/lib/hooks/eventsHooks";
import { Event } from "@/lib/types/event";

const EventsList = ({ communityId }: { communityId: string }) => {
  const { data } = useAllEvents({
    communityId,
  });

  const { mutate } = useDeleteEvent({
    communityId,
  });

  return (
    <div className="flex flex-col gap-4">
      {data?.map((event: Event) => (
        <Card key={event._id}>
          <CardHeader>
            <CardTitle>{event.title}</CardTitle>
            <CardDescription>{event.description}</CardDescription>
            <CardDescription>{event.date.toString()}</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button
              variant={"destructive"}
              onClick={() => {
                mutate(event._id);
              }}
            >
              Delete event
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default EventsList;
