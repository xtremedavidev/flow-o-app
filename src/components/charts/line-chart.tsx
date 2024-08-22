"use client";

import React, { useLayoutEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

export interface ChartData {
  date: number; // Timestamp for the X-axis
  value: number; // Numerical value for the Y-axis
  category: string; // Name value for the series
}

interface LineChartProps {
  data: ChartData[];
}

export const LineChart: React.FC<LineChartProps> = ({ data }) => {
  useLayoutEffect(() => {
    // Create root element
    let root = am5.Root.new("chartdiv");

    // Hide the amCharts logo
    root._logo!.dispose();

    // Apply theme
    const myTheme = am5.Theme.new(root);
    myTheme.rule("AxisLabel", ["minor"]).setAll({ dy: 1 });
    myTheme.rule("Grid", ["x"]).setAll({ strokeOpacity: 0.05 });
    myTheme.rule("Grid", ["x", "minor"]).setAll({ strokeOpacity: 0.05 });

    root.setThemes([am5themes_Animated.new(root), myTheme]);

    // Create the chart
    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        maxTooltipDistance: 0,
        pinchZoomX: true,
      }),
    );

    // Create axes
    let xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        maxDeviation: 0.2,
        baseInterval: { timeUnit: "hour", count: 1 },
        renderer: am5xy.AxisRendererX.new(root, { minorGridEnabled: true }),
        tooltip: am5.Tooltip.new(root, {}),
      }),
    );

    xAxis.get("renderer").labels.template.setAll({
      fill: am5.color(0xffffff),
      fontSize: 10,
    });

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      }),
    );

    yAxis.get("renderer").labels.template.setAll({
      fill: am5.color(0xffffff),
      fontSize: 10,
    });

    // Create series by category
    const categories = Array.from(new Set(data.map((item) => item.category)));

    categories.forEach((category) => {
      let seriesData = data.filter((item) => item.category === category);

      let series = chart.series.push(
        am5xy.LineSeries.new(root, {
          name: category,
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "value",
          valueXField: "date",
          legendValueText: "{valueY}",
          tooltip: am5.Tooltip.new(root, {
            pointerOrientation: "horizontal",
            labelText: "{valueY}",
          }),
        }),
      );

      series.data.setAll(seriesData);

      // Add bullets to each data point
      series.bullets.push(() => {
        return am5.Bullet.new(root, {
          sprite: am5.Circle.new(root, {
            radius: 5, // Size of the bullet
            fill: series.get("fill"), // Color of the bullet
          }),
        });
      });

      // Animate on load
      series.appear();
    });

    // Add cursor
    let cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        behavior: "none",
        snapToSeries: chart.series.values,
      }),
    );
    cursor.lineY.set("visible", false);

    // Add scrollbars
    chart.set(
      "scrollbarX",
      am5.Scrollbar.new(root, { orientation: "horizontal" }),
    );
    chart.set(
      "scrollbarY",
      am5.Scrollbar.new(root, { orientation: "vertical" }),
    );

    // Place the legend below the chart
    let legendContainer = root.container.children.push(
      am5.Container.new(root, {
        layout: root.verticalLayout,
        width: am5.percent(100),
        height: am5.percent(100),
      }),
    );

    legendContainer.children.push(chart);

    let legend = legendContainer.children.push(
      am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50,
        marginTop: 20,
        layout: root.gridLayout,
        maxHeight: 100, // Limit the height to 20% of the container
        verticalScrollbar: am5.Scrollbar.new(root, { orientation: "vertical" }), // Add vertical scrollbar if necessary
      }),
    );

    legend.labels.template.setAll({
      fill: am5.color(0xffffff),
      fontSize: 10,
    });

    // Ensure legend items wrap if necessary
    legend.itemContainers.template.set("width", am5.p100);
    legend.labels.template.setAll({
      width: am5.p100,
      textAlign: "left",
      fill: am5.color(0xffffff),
      fontSize: 10,
    });

    legend.valueLabels.template.setAll({
      width: am5.p100,
      textAlign: "right",
      fill: am5.color(0xffffff),
      fontSize: 10,
    });

    legend.data.setAll(chart.series.values);

    // Animate chart on load
    chart.appear(1000, 100);

    // Cleanup on unmount
    return () => {
      root.dispose();
    };
  }, [data]);

  return <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>;
};
