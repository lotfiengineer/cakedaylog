"use client";

import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date_picker";
import { Input } from "@/components/ui/input";
import { useAddCommunityMember } from "@/lib/hooks/communityMembersHooks";
import { MemberSchema, MemberSchemaType } from "@/lib/schemas/member.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

const MemberForm = ({ communityId }: { communityId: string }) => {
  const { mutate } = useAddCommunityMember();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<MemberSchemaType>({ resolver: zodResolver(MemberSchema) });

  const onSubmit: SubmitHandler<MemberSchemaType> = async (data) => {
    mutate({
      communityId: communityId,
      memberData: data,
    });
  };

  return (
    <form className="flex flex-col gap-3.5" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col">
        <Label
          htmlFor="firstname"
          className="text-secondary-dark font-semibold"
        >
          Firstname
        </Label>
        <Input
          id="firstname"
          className="bg-cyan-200 p-2"
          {...register("firstname")}
        />
        {errors.firstname && <span>{errors.firstname.message}</span>}
      </div>
      <div className="flex flex-col">
        <Label htmlFor="lastname" className="text-secondary-dark font-semibold">
          Lastname
        </Label>
        <Input
          id="lastname"
          className="bg-cyan-200 p-2"
          {...register("lastname")}
        />
        {errors.lastname && <span>{errors.lastname.message}</span>}
      </div>
      <div className="flex flex-col mb-6">
        <Label
          htmlFor="birthdate"
          className="text-secondary-dark font-semibold"
        >
          Birthdate
        </Label>
        <Controller
          name="birthdate"
          control={control}
          render={({ field }) => (
            <DatePicker onChange={(date) => field.onChange(date)} />
          )}
        />
        {errors.birthdate && <span>{errors.birthdate.message}</span>}
      </div>
      <div className="flex justify-center mb-7">
        <Button className="w-48 cursor-pointer" type="submit">
          Add a new clan member
        </Button>
      </div>
    </form>
  );
};

export default MemberForm;
