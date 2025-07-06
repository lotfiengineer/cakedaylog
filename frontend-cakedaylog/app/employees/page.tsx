"use client";
import { useEffect, useState } from "react";

const Employees = () => {
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

  const getAllEmployees = async () => {
    const result = await fetch("http://localhost:3770/api/employees", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(await result.json());
  };

  useEffect(() => {
    getAllEmployees();
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <form
          className="bg-white p-5 rounded-sm text-black"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col mb-3">
            <label htmlFor="firstname" className="text-primary">
              firstname
            </label>
            <input
              id="firstname"
              name="firstname"
              className="bg-cyan-400 p-2"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="lastname">lastname</label>
            <input
              id="lastname"
              name="lastname"
              className="bg-cyan-400 p-2"
              onChange={handleChange}
            />
          </div>
          <div className="flex-col flex-center-all">
            <label htmlFor="birthdate">birthdate</label>
            <input
              id="birthdate"
              name="birthdate"
              className="bg-cyan-400 p-2"
              onChange={handleChange}
            />
          </div>
          <button className="button" type="submit">
            SubMit
          </button>
        </form>
      </main>
    </div>
  );
};

export default Employees;
