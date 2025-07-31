"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/lib/hooks/authHooks";
import { UserSchema, UserSchemaType } from "@/lib/schemas/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const Login = () => {
  const { register, handleSubmit } = useForm<UserSchemaType>({
    resolver: zodResolver(UserSchema),
  });

  const { mutate } = useLogin();

  const onSubmit: SubmitHandler<UserSchemaType> = async (data) => {
    mutate(data);
  };

  return (
    <div>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("email")}
          defaultValue={"kingsilencer22@gmail.com"}
        />
        <Input {...register("password")} defaultValue={"123silencer"} />
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
};

export default Login;
