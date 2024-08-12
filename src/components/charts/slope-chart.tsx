"use client";

import React, { useLayoutEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

export const SlopeChart = () => {
  useLayoutEffect(() => {
    let root = am5.Root.new("chartdiv");

    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true,
      }),
    );

    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "year",
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 30,
        }),
        tooltip: am5.Tooltip.new(root, {}),
      }),
    );

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      }),
    );

    const colors = [
      am5.color(0x84c9ff), // Light blue
      am5.color(0xffa07a), // Light coral
      am5.color(0x98fb98), // Pale green
      am5.color(0xffd700), // Gold
      am5.color(0xcd5c5c), // Indian red
    ];

    const data = [
      { year: "1", value: 12.5 },
      { year: "2", value: 10 },
      { year: "3", value: 9 },
      { year: "4", value: 7.5 },
      { year: "5", value: 6 },
    ];

    for (let i = 0; i < 5; i++) {
      let series = chart.series.push(
        am5xy.LineSeries.new(root, {
          name: `Series ${i + 1}`,
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "value",
          categoryXField: "year",
          stroke: colors[i],
          tooltip: am5.Tooltip.new(root, {
            labelText: "{valueY}",
          }),
        }),
      );

      series.strokes.template.setAll({
        strokeWidth: 2,
        stroke: colors[i],
      });

      series.bullets.push(() => {
        return am5.Bullet.new(root, {
          locationY: 0.5,
          sprite: am5.Circle.new(root, {
            radius: 4,
            fill: colors[i],
          }),
        });
      });

      series.data.setAll(
        data.map((item) => ({ ...item, value: item.value + i * 1.5 })),
      );
    }

    xAxis.data.setAll(data);

    chart.set("cursor", am5xy.XYCursor.new(root, {}));

    return () => {
      root.dispose();
    };
  }, []);

  return <div id="chartdiv" style={{ width: "100%", height: "400px" }}></div>;
};
