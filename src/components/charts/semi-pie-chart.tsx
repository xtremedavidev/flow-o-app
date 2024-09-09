"use client";

import { SessionDataResponse } from "@/types";
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { FC, useLayoutEffect, useRef } from "react";

interface SemiPieChartProps {
  sessionData: SessionDataResponse;
}

export const SemiPieChart: FC<SemiPieChartProps> = ({ sessionData }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<am5.Root | null>(null);

  useLayoutEffect(() => {
    if (!chartRef.current) return;

    if (rootRef.current) {
      rootRef.current.dispose();
    }

    let root = am5.Root.new(chartRef.current);

    rootRef.current = root;

    root.setThemes([am5themes_Animated.new(root)]);

    root._logo!.dispose();

    let chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        startAngle: 180,
        endAngle: 360,
        layout: root.verticalLayout,
        innerRadius: am5.percent(50),
      })
    );

    let series = chart.series.push(
      am5percent.PieSeries.new(root, {
        startAngle: 180,
        endAngle: 360,
        valueField: "value",
        categoryField: "category",
        alignLabels: false,
      })
    );

    series.states.create("hidden", {
      startAngle: 180,
      endAngle: 180,
    });

    // Hide ticks (the lines leading to labels)
    series.ticks.template.setAll({
      forceHidden: true,
    });

    // Set labels inside the slices
    series.labels.template.setAll({
      opacity: 0,
      text: "{valuePercentTotal.formatNumber('#.0')}%", // Display percentage inside the slice
      radius: -30, // Position inside the slice (negative value brings it inside)
      fill: am5.color(0xffffff), // White color for the text
      fontSize: "1.5em", // Adjust font size as needed
    });

    // Setting colors manually for each slice
    series.slices.template.adapters.add("fill", (fill, target) => {
      const dataItem = target.dataItem;
      if (dataItem && dataItem.dataContext) {
        const category = (dataItem.dataContext as any).category;

        switch (category) {
          case "Resolved":
            return am5.color(0x3f9360);
          case "Warning":
            return am5.color(0xd48a2e);
          case "Unresolved":
            return am5.color(0xcc2023);
          default:
            return fill;
        }
      }
      return fill;
    });

    series.data.setAll([
      {
        value: Number(sessionData.data.resolvedPercentage),
        category: "Resolved",
      },
      // { value: sessionData.data.resolvedPercentage, category: "Warning" },
      {
        value: Number(sessionData.data.unresolvedPercentage),
        category: "Unresolved",
      },
    ]);

    let legend = chart.children.push(am5.Legend.new(root, {}));
    legend.data.setAll(chart.series.values);

    chart.appear(1000, 100);

    return () => {
      if (rootRef.current) {
        rootRef.current.dispose();
        rootRef.current = null;
      }
    };
  }, []);

  return <div ref={chartRef} style={{ width: "100%", height: "150px" }}></div>;
};
