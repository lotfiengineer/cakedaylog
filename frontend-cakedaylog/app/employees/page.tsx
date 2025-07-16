import AddEmployeeForm from "./AddEmployeeForm.client";
import EmployeesList from "./EmployeesList.client";
import { prefetchEmployees } from "../../lib/hooks/useEmployees";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

const Employees = async () => {
  const queryClient = await prefetchEmployees();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="py-10 max-w-xl mx-auto">
        <div className="flex flex-col w-full h-full justify-center">
          <AddEmployeeForm />
          <EmployeesList />
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default Employees;
