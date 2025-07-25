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
  author: string;
  communityId: string;
}

const CommunityDetails = ({ author, communityId }: Props) => {
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
          <Label htmlFor="editAuthor">Author</Label>
          <Input
            {...register("author")}
            id="editAuthor"
            defaultValue={author}
          />
          {errors.author && <span>{errors.author.message}</span>}
        </div>

        <Button>Edit Community</Button>
      </form>

      <DeleteCommunity communityId={communityId} />
    </div>
  );
};

export default CommunityDetails;
