"use client";

import React, { useEffect, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

export const LineChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null); // Create a ref for the div element

  useEffect(() => {
    if (!chartRef.current) return; // Make sure the ref is assigned

    let root = am5.Root.new(chartRef.current); // Initialize amCharts with the ref

    root.setThemes([am5themes_Animated.new(root)]);

    // Hide the amCharts logo
    root._logo!.dispose();

    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        layout: root.verticalLayout,
        pinchZoomX: true,
      }),
    );

    let data = [
      {
        year: "1930",
        flow_rate: 10,
        temperature: 25,
        differential_pressure: 30,
        static_pressure: 40,
        flow_total: 20,
      },
      {
        year: "1934",
        flow_rate: 15,
        temperature: 28,
        differential_pressure: 32,
        static_pressure: 35,
        flow_total: 22,
      },
      {
        year: "1938",
        flow_rate: 20,
        temperature: 30,
        differential_pressure: 25,
        static_pressure: 38,
        flow_total: 30,
      },
      {
        year: "1950",
        flow_rate: 22,
        temperature: 27,
        differential_pressure: 40,
        static_pressure: 42,
        flow_total: 35,
      },
      {
        year: "1954",
        flow_rate: 25,
        temperature: 24,
        differential_pressure: 35,
        static_pressure: 30,
        flow_total: 28,
      },
      {
        year: "1958",
        flow_rate: 30,
        temperature: 22,
        differential_pressure: 28,
        static_pressure: 45,
        flow_total: 40,
      },
      {
        year: "1962",
        flow_rate: 32,
        temperature: 26,
        differential_pressure: 22,
        static_pressure: 35,
        flow_total: 45,
      },
      {
        year: "1966",
        flow_rate: 35,
        temperature: 29,
        differential_pressure: 42,
        static_pressure: 40,
        flow_total: 38,
      },
      {
        year: "1970",
        flow_rate: 40,
        temperature: 31,
        differential_pressure: 30,
        static_pressure: 48,
        flow_total: 42,
      },
      {
        year: "1974",
        flow_rate: 45,
        temperature: 33,
        differential_pressure: 35,
        static_pressure: 46,
        flow_total: 48,
      },
      {
        year: "1978",
        flow_rate: 50,
        temperature: 35,
        differential_pressure: 40,
        static_pressure: 50,
        flow_total: 50,
      },
    ];

    let xRenderer = am5xy.AxisRendererX.new(root, { minorGridEnabled: true });
    xRenderer.grid.template.setAll({
      stroke: am5.color("#FFFFFF"), // Set grid line color to white
      strokeWidth: 2, // Set grid line width to 2px
      strokeDasharray: [4, 4], // Make grid lines dotted
      location: 0.5,
    });
    xRenderer.labels.template.setAll({
      location: 0.5,
      multiLocation: 0.5,
      fill: am5.color(0xffffff), // Set text color to white
      fontSize: "16px", // Increase font size
    });
    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "year",
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {}),
        snapTooltip: true,
      }),
    );

    xAxis.data.setAll(data);

    let yRenderer = am5xy.AxisRendererY.new(root, { inversed: false });
    yRenderer.grid.template.setAll({
      stroke: am5.color("#FFFFFF"), // Set grid line color to white
      strokeWidth: 2, // Set grid line width to 2px
      strokeDasharray: [4, 4], // Make grid lines dotted
    });

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxPrecision: 0,
        renderer: yRenderer,
      }),
    );

    yAxis.get("renderer").labels.template.setAll({
      fill: am5.color(0xffffff), // Set text color to white
      fontSize: "16px", // Increase font size
    });

    let cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        alwaysShow: true,
        xAxis: xAxis,
        positionX: 1,
      }),
    );

    cursor.lineY.set("visible", false);
    cursor.lineX.set("focusable", true);

    const createSeries = (name: string, field: string) => {
      let series = chart.series.push(
        am5xy.LineSeries.new(root, {
          name: name,
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: field,
          categoryXField: "year",
          tooltip: am5.Tooltip.new(root, {
            pointerOrientation: "horizontal",
            labelText: "[bold]{name}[/]\n{categoryX}: {valueY}",
          }),
        }),
      );

      series.bullets.push(() =>
        am5.Bullet.new(root, {
          sprite: am5.Circle.new(root, {
            radius: 5,
            fill: series.get("fill"),
          }),
        }),
      );

      series.set("setStateOnChildren", true);
      series.states.create("hover", {});
      series.mainContainer.set("setStateOnChildren", true);
      series.mainContainer.states.create("hover", {});
      series.strokes.template.states.create("hover", { strokeWidth: 4 });
      series.data.setAll(data);
      series.appear(1000);
    };

    createSeries("Flow Rate", "flow_rate");
    createSeries("Temperature", "temperature");
    createSeries("Differential Pressure", "differential_pressure");
    createSeries("Static Pressure", "static_pressure");
    createSeries("Flow Total", "flow_total");

    chart.set(
      "scrollbarX",
      am5.Scrollbar.new(root, { orientation: "horizontal", marginBottom: 20 }),
    );

    let legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50,
        fill: am5.color(0xffffff), // Set legend text color to white
      }),
    );

    legend.labels.template.setAll({
      fill: am5.color(0xffffff), // Set legend labels color to red (change this to your preferred color)
      fontSize: "16px", // Increase font size
    });

    legend.itemContainers.template.states.create("hover", {});

    legend.itemContainers.template.events.on("pointerover", (e) => {
      const dataItem = e.target.dataItem;
      if (dataItem) {
        const context = dataItem.dataContext as { hover: () => void };
        context.hover();
      }
    });

    legend.itemContainers.template.events.on("pointerout", (e) => {
      const dataItem = e.target.dataItem;
      if (dataItem) {
        const context = dataItem.dataContext as { unhover: () => void };
        context.unhover();
      }
    });

    legend.data.setAll(chart.series.values);

    chart.plotContainer.events.on("pointerout", () => {
      cursor.set("positionX", 1);
    });

    chart.plotContainer.events.on("pointerover", () => {
      cursor.set("positionX", undefined);
    });

    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, []);

  return <div ref={chartRef} className="h-[400px] w-full"></div>; // Use ref instead of id
};
