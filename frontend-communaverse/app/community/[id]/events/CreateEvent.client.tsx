"use client";

import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date_picker";
import { Input } from "@/components/ui/input";
import { useCreateEvent } from "@/lib/hooks/eventsHooks";
import { EventSchema, EventSchemaType } from "@/lib/schemas/event.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

const CreateEvent = ({ communityId }: { communityId: string }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<EventSchemaType>({
    resolver: zodResolver(EventSchema),
  });

  const { mutate } = useCreateEvent({ communityId });

  const onSubmit: SubmitHandler<EventSchemaType> = (data) => {
    mutate(data);
  };

  return (
    <div className="mb-10 mt-6">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <Input {...register("title")} />
        <Input {...register("description")} />
        <Input {...register("communityId")} value={communityId} hidden />
        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <DatePicker onChange={(date) => field.onChange(date)} />
          )}
        />
        {errors.root?.message && <span>{errors.root.message}</span>}
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default CreateEvent;
