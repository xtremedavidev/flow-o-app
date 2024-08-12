"use client";

import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect, useRef } from "react";

export const SemiPieChart = () => {
  const chartRef = useRef<HTMLDivElement>(null); // Create a ref for the div element

  useLayoutEffect(() => {
    if (!chartRef.current) return; // Ensure the ref is assigned

    let root = am5.Root.new(chartRef.current); // Initialize amCharts with the ref

    root.setThemes([am5themes_Animated.new(root)]);

    // Hide the amCharts logo
    root._logo!.dispose();

    let chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        startAngle: 180,
        endAngle: 360,
        layout: root.verticalLayout,
        innerRadius: am5.percent(50),
      }),
    );

    let series = chart.series.push(
      am5percent.PieSeries.new(root, {
        startAngle: 180,
        endAngle: 360,
        valueField: "value",
        categoryField: "category",
        alignLabels: false,
      }),
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
          case "One":
            return am5.color(0x3f9360); // Green color
          case "Two":
            return am5.color(0xd48a2e); // Orange color
          case "Three":
            return am5.color(0xcc2023); // Red color
          default:
            return fill;
        }
      }
      return fill;
    });

    series.data.setAll([
      { value: 50, category: "One" },
      { value: 25, category: "Two" },
      { value: 25, category: "Three" },
    ]);

    let legend = chart.children.push(am5.Legend.new(root, {}));
    legend.data.setAll(chart.series.values);

    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, []);

  return (
    <div ref={chartRef} style={{ width: "100%", height: "150px" }}></div> // Use ref instead of id
  );
};
