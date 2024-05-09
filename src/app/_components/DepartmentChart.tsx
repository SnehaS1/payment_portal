import { useLayoutEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { EmployeeType } from "../test/page";
import { EmployeeRoles } from "@/helpers/constants";

type RoleCounts = {
  [role: string]: number;
};

type RoleCount = {
  role: string;
  value: number;
};

function DepartmentChart({ employees = [] }: { employees: EmployeeType[] }) {
  useLayoutEffect(() => {
    let root = am5.Root.new("chartdiv");
    console.log("employyes", employees, "sneha1");
    const roleCounts: RoleCount[] = employees.reduce(
      (acc: RoleCount[], employee: EmployeeType) => {
        const existingRoleIndex = acc.findIndex(
          (item) => item.role === employee.employeeRole
        );
        if (existingRoleIndex !== -1) {
          acc[existingRoleIndex].value++;
        } else {
          acc.push({ role: employee.employeeRole, value: 1 });
        }
        return acc;
      },
      []
    );
    console.log("sneha22", EmployeeRoles, roleCounts);

    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true,
        paddingLeft: 0,
        paddingRight: 1,
      })
    );
    let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineY.set("visible", false);
    let xRenderer = am5xy.AxisRendererX.new(root, {
      minGridDistance: 30,
      minorGridEnabled: true,
    });

    xRenderer.labels.template.setAll({
      rotation: -90,
      centerY: am5.p50,
      centerX: am5.p100,
      paddingRight: 15,
    });

    xRenderer.grid.template.setAll({
      location: 1,
    });

    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        maxDeviation: 0.3,
        categoryField: "role",
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    let yRenderer = am5xy.AxisRendererY.new(root, {
      strokeOpacity: 0.1,
    });

    // Create X-Axis

    xAxis.data.setAll(roleCounts);
    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0.3,
        renderer: yRenderer,
      })
    );
    let series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Series 1",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        sequencedInterpolation: true,
        categoryXField: "country",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY}",
        }),
      })
    );
    series.columns.template.setAll({
      cornerRadiusTL: 5,
      cornerRadiusTR: 5,
      strokeOpacity: 0,
    });
    // series.columns.template.adapters.add("fill", function (fill, target) {
    //   return chart.get("colors").getIndex(series.columns.indexOf(target));
    // });

    // series.columns.template.adapters.add("stroke", function (stroke, target) {
    //   return chart.get("colors").getIndex(series.columns.indexOf(target));
    // });

    // Create series

    series.data.setAll(roleCounts);

    // Add legend
    let legend = chart.children.push(am5.Legend.new(root, {}));
    legend.data.setAll(chart.series.values);

    // Add cursor
    chart.set("cursor", am5xy.XYCursor.new(root, {}));
    xAxis.data.setAll(roleCounts);
    series.data.setAll(roleCounts);
    return () => {
      root.dispose();
    };
  }, [employees]);

  return <div id="chartdiv" style={{ width: "500px", height: "500px" }}></div>;
}
export default DepartmentChart;
