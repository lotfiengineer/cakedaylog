import EmployeeForm from "./EmployeeForm";
import EmployeesList from "./EmployeesList";

const Employees = () => {
  return (
    <div className="p-5 h-screen max-w-xl mx-auto">
      <div className="flex flex-col w-full h-full justify-center">
        <EmployeeForm />
        <EmployeesList />
      </div>
    </div>
  );
};

export default Employees;
