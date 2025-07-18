"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DatePicker } from "@/components/ui/date_picker";
import {
  MemberSchema,
  MemberSchemaType,
} from "../../lib/schemas/member.schema";
import { useAddEmployee } from "../../lib/hooks/membersHooks";

const AddEmployeeForm = () => {
  const { mutate } = useAddEmployee();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<MemberSchemaType>({ resolver: zodResolver(MemberSchema) });

  const onSubmit: SubmitHandler<MemberSchemaType> = async (data) => {
    await mutate(data);
  };

  return (
    <div className="flex justify-center">
      <div className="w-full">
        <form
          className="flex flex-col gap-3.5"
          onSubmit={handleSubmit(onSubmit)}
        >
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
            <Label
              htmlFor="lastname"
              className="text-secondary-dark font-semibold"
            >
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

            {/* <Input
              id="birthdate"
              className="bg-cyan-200 p-2"
              {...register("birthdate")}
            /> */}
            {errors.birthdate && <span>{errors.birthdate.message}</span>}
          </div>
          <div className="flex justify-center mb-7">
            <Button className="w-48 cursor-pointer" type="submit">
              Add a new clan member
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeeForm;
