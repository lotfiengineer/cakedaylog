import React, { PropsWithChildren } from "react";

const MainWrapper = ({ children }: PropsWithChildren) => {
  return (
    <main className="bg-white flex justify-center w-full px-4 py-2 [&>*:first-child]:w-full min-h-screen">
      {children}
    </main>
  );
};

export default MainWrapper;
