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
import { useMembers, useDeleteEmployee } from "../../lib/hooks/membersHooks";
import { Member } from "../../lib/types/member";

const EmployeesList = () => {
  const { data: membersList } = useMembers();
  const { mutate: deleteEmployee } = useDeleteEmployee();

  return (
    <div>
      <Table>
        <TableCaption>Employees List</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Firstname</TableHead>
            <TableHead>Lastname</TableHead>
            <TableHead>Birthdate</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {membersList?.map((emp: Member) => (
            <TableRow key={emp._id}>
              <TableCell>{emp.firstname}</TableCell>
              <TableCell>{emp.lastname}</TableCell>
              <TableCell>{emp.birthdate}</TableCell>
              <TableCell>
                <button
                  onClick={async () => {
                    deleteEmployee(emp._id);
                  }}
                  className="bg-error text-white rounded-md p-1.5 cursor-pointer"
                >
                  Action
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default EmployeesList;
