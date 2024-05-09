import React from "react";
import SalaryListComponent from "../_components/SalaryList";
import axios from "axios";

async function getSalaries() {
  // const res = await axios.get("http://localhost:3000/api/employeeList");

  const res = await axios.get(`${process.env.BACKEND_URL}/api/salaries`);
  if (res.status !== 200) {
    console.log("Error fetching salaries", res.data);
    return [];
  }
  return res.data.salaries;
}
// async function SalaryPage() {
//   const salaries = await getSalaries();
//   return (
//     <div className="w-2/3">
//       Salary Page
//       <SalaryListComponent salarylist={salaries} />
//     </div>
//   );
// }

// export default SalaryPage;

// async function SalaryPage() {
//   const salaries = await getSalaries();
//   return (
//     <div className="w-2/3">
//       Salary Page
//       <SalaryListComponent salarylist={[]} />
//     </div>
//   );
// }

export default async function Page() {
  const salaries = await getSalaries();
  return (
    <div className="w-2/3">
      Salary Page
      <SalaryListComponent salarylist={salaries} />
    </div>
  );
}
