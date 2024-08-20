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

    // Apply theme
    const myTheme = am5.Theme.new(root);

    myTheme.rule("AxisLabel", ["minor"]).setAll({
      dy: 1,
    });

    myTheme.rule("Grid", ["x"]).setAll({
      strokeOpacity: 0.05,
    });

    myTheme.rule("Grid", ["x", "minor"]).setAll({
      strokeOpacity: 0.05,
    });

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
        baseInterval: {
          timeUnit: "hour",
          count: 1,
        },
        renderer: am5xy.AxisRendererX.new(root, {
          minorGridEnabled: true,
        }),
        tooltip: am5.Tooltip.new(root, {}),
      }),
    );

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      }),
    );

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

    // -----------------------------------------------

    // Show tooltips for all series on the cursor's x-position

    // -----------------------------------------------

    // Add scrollbars
    chart.set(
      "scrollbarX",
      am5.Scrollbar.new(root, {
        orientation: "horizontal",
      }),
    );

    chart.set(
      "scrollbarY",
      am5.Scrollbar.new(root, {
        orientation: "vertical",
      }),
    );

    // Add legend
    let legend = chart.rightAxesContainer.children.push(
      am5.Legend.new(root, {
        width: 200,
        paddingLeft: 15,
        height: am5.percent(100),
      }),
    );

    // Highlight series on legend hover
    legend.itemContainers.template.events.on("pointerover", function (e) {
      let itemContainer = e.target;

      let series = itemContainer.dataItem?.dataContext as am5xy.LineSeries;

      chart.series.each(function (chartSeries) {
        if (chartSeries instanceof am5xy.LineSeries) {
          if (chartSeries !== series) {
            chartSeries.strokes.template.setAll({
              strokeOpacity: 0.15,
              stroke: am5.color(0x000000),
            });
          } else {
            chartSeries.strokes.template.setAll({
              strokeWidth: 4,
            });
          }
        }
      });
    });

    // Reset series on legend out
    legend.itemContainers.template.events.on("pointerout", function () {
      chart.series.each(function (chartSeries) {
        if (chartSeries instanceof am5xy.LineSeries) {
          chartSeries.strokes.template.setAll({
            strokeOpacity: 1,
            strokeWidth: 1,
            stroke: chartSeries.get("fill"),
          });
        }
      });
    });

    legend.itemContainers.template.set("width", am5.p100);
    legend.valueLabels.template.setAll({
      width: am5.p100,
      textAlign: "right",
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
