import { getEmployees } from "@/lib/server/getEmployees";
import EmployeeForm from "./EmployeeForm";
import EmployeesList from "./EmployeesList.client";

const Employees = async () => {
  const employees = await getEmployees();

  return (
    <div className="p-5 h-screen max-w-xl mx-auto">
      <div className="flex flex-col w-full h-full justify-center">
        <EmployeeForm />
        <EmployeesList initialData={employees} />
      </div>
    </div>
  );
};

export default Employees;
