import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { Employee } from "./model/Employee";

const EmployeesList = async () => {
  const employeesList = await fetch("http://localhost:3770/api/employees", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    return response.json() as Promise<Employee[]>;
  });

  return (
    <div>
      <Table>
        <TableCaption>Employees List</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Firstname</TableHead>
            <TableHead>Lastname</TableHead>
            <TableHead>Birthdate</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employeesList.map((emp: Employee) => (
            <TableRow key={emp._id}>
              <TableCell>{emp.firstname}</TableCell>
              <TableCell>{emp.lastname}</TableCell>
              <TableCell>{emp.birthdate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default EmployeesList;
