"use client";

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
import { useEmployees } from "../hooks/useEmployees";
import { Employee } from "../types/employee";

const EmployeesList = ({ initialData }: { initialData: Employee[] }) => {
  const { data: employeesList, } = useEmployees(initialData);

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
          {employeesList?.map((emp: Employee) => (
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
