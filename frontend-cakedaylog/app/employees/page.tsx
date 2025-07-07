import EmployeeForm from "./EmployeeForm";
import EmployeesList from "./EmployeesList";

const Employees = () => {
  return (
    <div className="max-w-2xl p-5">
      <EmployeeForm />
      <EmployeesList />
    </div>
  );
};

export default Employees;
