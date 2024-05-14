"use client";
import axios from "axios";
import { redirect } from "next/navigation";
import Link from "next/link";
import React, { Suspense, useEffect, useLayoutEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Dayjs } from "dayjs";
import Typography from "@mui/material/Typography";
import EmployeesList from "@/app/_components/EmployeesList";
import DepartmentChart from "@/app/_components/DepartmentChart";
import Celebrations from "@/app/_components/Celebrations";
import Button from "@mui/material/Button";
import { getTokenClient } from "@/helpers/utils";

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
  const [loader, setLoader] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoader(true);
        const response = await axios.get("/api/employeeList");
        if (response.data.status != 200) {
          if (
            response.data.status == 500 &&
            response.data.employeeList == "jwt must be provided"
          ) {
            toast.error("Session Expired Please Login Again ");
            router.push("/");
          }

          toast.error("Data fetching failed");

          router.push("/login");
        }
        setData(response.data.employeeList || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]);
      } finally {
        setLoader(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen ">
      <section className="flex justify-between mb-3 lg:py-5">
        <Typography variant="h4" gutterBottom textAlign="center">
          Employee List
        </Typography>
        <Link href="/employees/create">
          <Button variant="contained">Add Employee </Button>
        </Link>
      </section>

      <div className="flex flex-col md:flex-row gap-20 justify-evenly ">
        <EmployeesList employees={data} employeeLoader={loader} />

        {/* <DepartmentChart employees={data} /> */}
      </div>

      <Toaster />
    </div>
  );
}
