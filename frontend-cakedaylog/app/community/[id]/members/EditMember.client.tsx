"use client";
import { useRef } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useUpdateCommunityMember } from "@/lib/hooks/communityMembersHooks";
import { Member } from "@/lib/types/member";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { DatePicker } from "@/components/ui/date_picker";
import { MemberSchemaType, MemberSchema } from "@/lib/schemas/member.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

const EditMember = ({
  member,
  communityId,
}: {
  member: Member;
  communityId: string;
}) => {
  const { mutateAsync: updateCommunityMember } = useUpdateCommunityMember();

  const closeRef = useRef<HTMLButtonElement>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<MemberSchemaType>({ resolver: zodResolver(MemberSchema) });

  const onSubmit: SubmitHandler<MemberSchemaType> = async (data) => {
    await updateCommunityMember({
      memberData: data,
      communityId: communityId,
      memberId: member._id,
    });

    console.log(data);

    closeRef.current?.click();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3.5"
        >
          <DialogHeader>
            <DialogTitle>Edit Member</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col ">
            <Label
              htmlFor="firstname"
              className="text-secondary-dark font-semibold"
            >
              Firstname
            </Label>
            <Input
              id="firstname"
              className="bg-cyan-200 p-2"
              defaultValue={member.firstname}
              {...register("firstname")}
            />
            {errors.firstname && <span>{errors.firstname.message}</span>}
          </div>
          <div className="flex flex-col">
            <Label
              htmlFor="lastname"
              className="text-secondary-dark font-semibold"
            >
              Lastname
            </Label>
            <Input
              id="lastname"
              className="bg-cyan-200 p-2"
              defaultValue={member.lastname}
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
                <DatePicker
                  defaultDate={new Date(member.birthdate)}
                  onChange={(date) => field.onChange(date)}
                />
              )}
            />
            {errors.birthdate && <span>{errors.birthdate.message}</span>}
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant={"outline"}>Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
            <DialogClose asChild>
              <button ref={closeRef} className="hidden" />
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditMember;
