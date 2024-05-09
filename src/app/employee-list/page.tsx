import axios, { AxiosResponse, AxiosError } from "axios";
import React from "react";
import EmployeesList from "../_components/EmployeesList";

async function getEmployees() {
  const res = await axios.get(`${process.env.BACKEND_URL}/api/employeeList`);

  if (res.status !== 200) {
    console.log("Error fetching employees", res.data);
    return [];
  }
  console.log("Success fetching employees1", res.data.data);

  return res.data.data;
}
async function EmployeeListPage() {
  const projects = await getEmployees();

  return (
    <div style={{ width: "100%" }}>
      EmployeeListPage
      <EmployeesList employees={projects} />
    </div>
  );
}

export default EmployeeListPage;
