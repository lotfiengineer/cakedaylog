"use client";

import React, { JSX, useState } from "react";

const monthNames: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const BirthdayCalendar: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

  const getDaysInMonth = (month: number, year: number): number => {
    return new Date(year, month + 1, 0).getDate();
  };

  const renderDays = (monthIndex: number): JSX.Element => {
    const days = getDaysInMonth(monthIndex, new Date().getFullYear());
    return (
      <div className="grid grid-cols-7 gap-2 mt-4">
        {Array.from({ length: days }, (_, i) => (
          <div key={i} className="border p-2 text-center rounded bg-blue-50">
            {i + 1}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Birthday Calendar</h1>
      <div className="grid grid-cols-3 gap-4">
        {monthNames.map((month, index) => (
          <button
            key={month}
            className={`p-3 rounded border ${
              selectedMonth === index ? "bg-blue-200" : "bg-white"
            }`}
            onClick={() =>
              setSelectedMonth(selectedMonth === index ? null : index)
            }
          >
            {month}
          </button>
        ))}
      </div>

      {selectedMonth !== null && (
        <div>
          <h2 className="text-lg font-semibold mt-6">
            {monthNames[selectedMonth]} Days
          </h2>
          {renderDays(selectedMonth)}
        </div>
      )}
    </div>
  );
};

export default BirthdayCalendar;
