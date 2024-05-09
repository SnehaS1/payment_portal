import React from "react";
import SalaryListComponent from "../components/SalaryList";
import axios from "axios";

async function getSalaries() {
  // const res = await axios.get("http://localhost:3000/api/employeeList");

  const res = await axios.get("http://localhost:3000/api/salaries");
  if (res.status !== 200) {
    console.log("Error fetching salaries", res.data);
    return [];
  }
  console.log("Success fetching salaries", res.data);
  return res.data.salaries;
}
async function SalaryPage() {
  const salaries = await getSalaries();
  console.log("salaries", salaries);
  return (
    <div className="w-2/3">
      Salary Page
      <SalaryListComponent salarylist={salaries} />
    </div>
  );
}

export default SalaryPage;
