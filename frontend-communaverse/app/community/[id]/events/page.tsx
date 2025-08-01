import React from "react";
import CreateEvent from "./CreateEvent.client";
import EventsList from "./EventsList.client";

const Events = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  return (
    <div>
      <CreateEvent communityId={id} />
      <EventsList communityId={id} />
    </div>
  );
};

export default Events;
