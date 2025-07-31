"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CommunitySchema,
  CommunitySchemaType,
} from "@/lib/schemas/community.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import DeleteCommunity from "./DeleteCommunity.client";
import { useEditCommunity } from "@/lib/hooks/communityHooks";

interface Props {
  name: string;
  communityId: string;
}

const CommunityDetails = ({ name, communityId }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CommunitySchemaType>({
    resolver: zodResolver(CommunitySchema),
  });

  const { mutate: editCommunity } = useEditCommunity();

  const onSubmit: SubmitHandler<CommunitySchemaType> = (data) => {
    editCommunity({
      communityId: communityId,
      community: data,
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <Label htmlFor="editName">Name</Label>
          <Input
            {...register("name")}
            id="editName"
            defaultValue={name}
          />
          {errors.name && <span>{errors.name.message}</span>}
        </div>

        <Button>Edit Community</Button>
      </form>

      <DeleteCommunity communityId={communityId} />
    </div>
  );
};

export default CommunityDetails;
