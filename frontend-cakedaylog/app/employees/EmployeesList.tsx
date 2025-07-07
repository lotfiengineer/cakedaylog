import React from "react";

const EmployeesList = async () => {
  const result = await fetch("http://localhost:3770/api/employees", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const employees = await result.json();

  return (
    <div>
      <table className="flex flex-col">
        <thead>
          <tr className="flex justify-between">
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Birthdate</th>
          </tr>
        </thead>
        <tbody className="flex flex-col">
          {employees.map((emp: any) => (
            <tr key={emp.id} className="flex justify-between">
              <td>{emp.firstname}</td>
              <td>{emp.lastname}</td>
              <td>{emp.birthdate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeesList;
