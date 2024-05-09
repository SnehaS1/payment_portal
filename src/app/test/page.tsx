"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Toaster, toast, useToaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import EmployeesList from "../_components/EmployeesList";
import { Dayjs } from "dayjs";
import { Celebration } from "@mui/icons-material";
import Celebrations from "../_components/Celebrations";
import Typography from "@mui/material/Typography";
import DepartmentChart from "../_components/DepartmentChart";

export interface EmployeeType {
  avatar: string;
  basicSalary: number;
  email: string;
  employeeId: string;
  employeeRole: string;
  fullName: string;
  _id: string;
  joiningDate: Dayjs;
  birthDate: Dayjs;
}

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState<EmployeeType[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/employeeList");
        if (response.status == 200) {
          toast.success("Data fetched successfully");
        } else {
          toast.error("Data fetching failed");
        }
        setData(response.data.employeeList || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    console.count("sw");
    fetchData();
  }, []);
  const logout = async () => {
    try {
      await axios.get("/api/employeeList");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  console.log(data, "data sneha1");
  return (
    <div className="flex flex-col min-h-screen ">
      <hr />
      <Typography variant="h4" gutterBottom>
        Employee List
      </Typography>
      <Toaster />
      <DepartmentChart employees={data} />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "20px",
          width: "100%",
        }}
      >
        <EmployeesList employees={data} />

        <Celebrations employees={data} />
      </div>
      <Celebration />
      <button
        onClick={logout}
        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
    </div>
  );
}
