"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateCommunity } from "@/lib/hooks/communityHooks";
import {
  CommunitySchema,
  CommunitySchemaType,
} from "@/lib/schemas/community.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

const CreateCommunityForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CommunitySchemaType>({ resolver: zodResolver(CommunitySchema) });

  const { mutate: createCommunity } = useCreateCommunity();

  const onSubmit: SubmitHandler<CommunitySchemaType> = async (data) => {
    createCommunity({
      community: data,
    });
  };

  return (
    <div className="max-w-60 mx-auto mt-10">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <Label>Author name</Label>
          <Input {...register("author")} />
          {errors.author && <span>{errors.author.message}</span>}
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default CreateCommunityForm;
