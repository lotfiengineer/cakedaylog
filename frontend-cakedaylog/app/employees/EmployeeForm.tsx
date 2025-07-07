"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";

const EmployeeForm = () => {
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    birthdate: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await fetch("http://localhost:3770/api/employees", {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    console.log(await result.json());
  };

  return (
    <div className="flex justify-center">
      <div className="w-full">
        <form className="flex flex-col gap-3.5" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <Label
              htmlFor="firstname"
              className="text-secondary-dark font-semibold"
            >
              Firstname
            </Label>
            <Input
              id="firstname"
              name="firstname"
              className="bg-cyan-200 p-2"
              onChange={handleChange}
            />
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
              name="lastname"
              className="bg-cyan-200 p-2"
              onChange={handleChange}
            />
          </div>
          <div className="flex-col mb-6">
            <Label
              htmlFor="birthdate"
              className="text-secondary-dark font-semibold"
            >
              Birthdate
            </Label>
            <Input
              id="birthdate"
              name="birthdate"
              className="bg-cyan-200 p-2"
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-center mb-7">
            <Button className="w-48 cursor-pointer" type="submit">
              Submit the form PLS!
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;
