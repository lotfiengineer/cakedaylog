"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSignup } from "@/lib/hooks/authHooks";
import { UserSchema, UserSchemaType } from "@/lib/schemas/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSchemaType>({
    resolver: zodResolver(UserSchema),
  });

  const { mutate } = useSignup();

  const onSubmit: SubmitHandler<UserSchemaType> = async (data) => {
    mutate(data);
  };
  return (
    <div className="mt-4">
      <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label>Email</Label>
          <Input {...register("email")} />
          {errors.email && <span>{errors.email.message}</span>}
        </div>
        <div>
          <Label>Password</Label>
          <Input {...register("password")} />
          {errors.password && <span>{errors.password.message}</span>}
        </div>
        <Button type="submit">Signup</Button>
      </form>

      {errors.root?.message && <span>{errors.root?.message}</span>}
    </div>
  );
};

export default Signup;
