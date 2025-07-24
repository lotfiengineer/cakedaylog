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

interface Props {
  author: string;
}

const CommunityDetails = ({ author }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CommunitySchemaType>({
    resolver: zodResolver(CommunitySchema),
  });

  const onSubmit: SubmitHandler<CommunitySchemaType> = (data) => {
    // Todo: call the api to edit the community
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

      <DeleteCommunity />
    </div>
  );
};

export default CommunityDetails;
