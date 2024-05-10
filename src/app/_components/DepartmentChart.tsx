import { useEffect, useLayoutEffect, useState } from "react";

import { EmployeeType } from "../test/page";
import { EmployeeRoles } from "@/helpers/constants";

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
  employees: EmployeeType[];
}) {
  const [piedata, setPieData] = useState<RoleCount[]>([]);
  useEffect(() => {
    const roleCounts: RoleCount[] = employees.reduce(
      (acc: RoleCount[], employee: EmployeeType) => {
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
    <>
      {" "}
      <PieChart
        series={[
          {
            data: piedata,
          },
        ]}
        width={800}
        height={200}
      />
    </>
  );
}
