"use client";
import {  useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Employee } from "./employees/model/Employee";

async function getEmployees() {
  const res = await fetch("http://localhost:3770/api/employees");
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  return res.json();
}

export default function Home() {
  const { data, isLoading, isError, error } = useQuery<Employee[]>({
    queryKey: ["employees"],
    queryFn: getEmployees,
  });

  if (isLoading) return <div>Loaaadddiing Employees....</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div>Home page</div>
      <div>Go to employees page</div>
      <div>
        <button className="button">
          <Link href={"/employees"}>Go</Link>

          <ul>
            {data?.map((employee) => (
              <li key={employee._id}>{employee.firstname}</li>
            ))}
          </ul>
        </button>
      </div>
    </div>
  );
}
