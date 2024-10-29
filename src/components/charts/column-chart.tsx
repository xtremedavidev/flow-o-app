"use client";

import { FC, useEffect, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";
import { FetcherResult } from "@/utils";
import { WellActivityChartResp } from "@/types";

interface ColumnChartProps {
  wellChartData: FetcherResult<WellActivityChartResp[]> | { error: string };
}

export const ColumnChart: FC<ColumnChartProps> = ({ wellChartData }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Create root element
    let root = am5.Root.new(chartRef.current);

    // Hide the amCharts logo
    root._logo!.dispose();

    // Create custom theme
    const myTheme = am5.Theme.new(root);
    myTheme.rule("AxisLabel").setAll({
      fill: am5.color(0xffffff), // Set label text color to white
    });
    myTheme.rule("Grid").setAll({
      location: 0.5,
      strokeOpacity: 0.5,
    });

    // Set themes
    root.setThemes([
      am5themes_Animated.new(root),
      am5themes_Responsive.new(root),
      myTheme,
    ]);

    // Create chart
    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        paddingLeft: 0,
      })
    );

    // Add cursor
    let cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        behavior: "zoomX",
      })
    );
    cursor.lineY.set("visible", false);

    // Initialize the start date (January 1st) and end date (December 31st)
    let startDate = new Date();
    startDate.setMonth(0); // January
    startDate.setDate(1);
    startDate.setHours(0, 0, 0, 0);

    let endDate = new Date();
    endDate.setMonth(11); // December
    endDate.setDate(31);
    endDate.setHours(0, 0, 0, 0);

    function generateData(date: Date) {
      // Ensure the value is between 0 and 100
      let value = Math.round(Math.random() * 100);
      return {
        date: date.getTime(),
        value: value,
      };
    }

    // Create axes
    let xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        maxDeviation: 0.1,
        baseInterval: {
          // timeUnit: "month",
          // count: 1,
          timeUnit: "day",
          count: 1,
        },
        renderer: am5xy.AxisRendererX.new(root, {
          minorGridEnabled: true,
          minorLabelsEnabled: true,
          minGridDistance: 50, // Adjust to ensure labels don't overlap with the chart
        }),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    // Position the labels below the bars
    xAxis.get("renderer").labels.template.setAll({
      location: 0.5, // Adjust to position labels between ticks, below bars
      paddingTop: 10, // Push the labels down slightly for better spacing
    });

    xAxis.set("dateFormats", {
      day: "MMM dd",
    });

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {
          minGridDistance: 30, // Adjust to ensure labels don't overlap with the chart
        }),
        min: 0, // Ensure the minimum value on the y-axis is 0
        max: 100, // Ensure the maximum value on the y-axis is 100
      })
    );

    // Add series
    let series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Series",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        valueXField: "date",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY}",
        }),
      })
    );

    // Set column appearance
    series.columns.template.setAll({
      width: 20, // Set the width of each bar to 20px
      cornerRadiusTL: 4, // Set top-left corner radius
      cornerRadiusTR: 4, // Set top-right corner radius
      cornerRadiusBL: 4, // Set bottom-left corner radius
      cornerRadiusBR: 4, // Set bottom-right corner radius
      maxWidth: 15, // Ensure there's some space between bars
    });

    // Add scrollbar
    chart.set(
      "scrollbarX",
      am5.Scrollbar.new(root, {
        orientation: "horizontal",
      })
    );

    const parseChartData = (data: { date: string; count: number }[]) => {
      return data.map((item) => ({
        date: new Date(item.date).getTime(),
        value: item.count,
      }));
    };

    let data =
      "error" in wellChartData ? [] : parseChartData(wellChartData.data);
    series.data.setAll(data);

    // Make stuff animate on load
    series.appear(1000);
    chart.appear(1000, 100);

    // Cleanup on component unmount
    return () => {
      root.dispose();
    };
  }, []);

  return <div ref={chartRef} style={{ width: "100%", height: "250px" }}></div>;
};
