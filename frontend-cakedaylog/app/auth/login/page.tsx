"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/lib/hooks/authHooks";
import { UserSchema, UserSchemaType } from "@/lib/schemas/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSchemaType>({
    resolver: zodResolver(UserSchema),
  });

  const { mutate } = useLogin();

  const onSubmit: SubmitHandler<UserSchemaType> = async (data) => {
    mutate(data);
  };

  return (
    <div>
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
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
};

export default Login;
