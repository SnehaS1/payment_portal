"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Toaster, toast, useToaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Dayjs } from "dayjs";
import Typography from "@mui/material/Typography";
import SalaryListComponent from "@/app/_components/SalaryList";
import Button from "@mui/material/Button";
import { SalaryStatus } from "@/helpers/constants";

interface SalaryType {
  _id: string;
  employeeId: string;
  fullName: string;
  basicSalary: number;
  employeeRole: string;
  tax: number;
  deduction: number;
  allowance: number;
  salaryStatus: string;
  email: string;
  isEndOfService: boolean;
}
export default function SalaryPage() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<SalaryType[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/salaries");
        if (response.status != 200) {
          toast.error("Data fetching failed");
        }
        setData(response.data.salaries || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const pendingSalary = data.filter(
    (item) => item.salaryStatus !== SalaryStatus.PAID
  );
  return (
    <div className="flex flex-col h-screen">
      <section className="flex justify-between mb-3">
        <Typography variant="h4" gutterBottom>
          Salary
        </Typography>
        <Link href="/payment-history">
          <Button variant="contained">View Processed Salaries</Button>
        </Link>
      </section>
      <SalaryListComponent salaryList={pendingSalary} />
    </div>
  );
}
