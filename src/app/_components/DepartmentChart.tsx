import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";

import { PieChart } from "@mui/x-charts/PieChart";

type RoleCounts = {
  [role: string]: number;
};

type RoleCount = {
  label: string;
  value: number;
  id: string;
};

export default function DepartmentChart({
  employees = [],
}: {
  employees: any[];
}) {
  const [piedata, setPieData] = useState<RoleCount[]>([]);
  useEffect(() => {
    const roleCounts: RoleCount[] = employees.reduce(
      (acc: RoleCount[], employee: any) => {
        const existingRoleIndex = acc.findIndex(
          (item) => item.label === employee.employeeRole
        );
        if (existingRoleIndex !== -1) {
          acc[existingRoleIndex].value++;
        } else {
          acc.push({
            id: employee.employeeRole,
            label: employee.employeeRole,
            value: 1,
          });
        }
        return acc;
      },
      []
    );
    setPieData(roleCounts);
  }, [employees]);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h4" gutterBottom textAlign="center">
        Employees vs Role
      </Typography>
      <PieChart
        series={[
          {
            data: piedata,
          },
        ]}
        width={550}
        height={400}
      />
    </div>
  );
}
