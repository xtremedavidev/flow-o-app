"use client";

import React, { useEffect, useState } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";

export const PuslingMapChart: React.FC = () => {
  const [isGlobeView, setIsGlobeView] = useState(false);

  useEffect(() => {
    // Create root element
    let root = am5.Root.new("pulsingmapdiv");

    // Hide the amCharts logo
    root._logo!.dispose();

    // Set themes
    root.setThemes([am5themes_Animated.new(root)]);

    // Create the map chart
    let chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: "rotateX",
        panY: "translateY",
        projection: isGlobeView
          ? am5map.geoOrthographic()
          : am5map.geoMercator(),
      }),
    );

    // Create series for background fill
    let backgroundSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {}),
    );
    backgroundSeries.mapPolygons.template.setAll({
      fill: root.interfaceColors.get("alternativeBackground"),
      fillOpacity: isGlobeView ? 0.1 : 0,
      strokeOpacity: 0,
    });

    // Add background polygon
    backgroundSeries.data.push({
      geometry: am5map.getGeoRectangle(90, 180, -90, -180),
    });

    // Create main polygon series for countries
    let polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
      }),
    );

    // Create line series for trajectory lines
    let lineSeries = chart.series.push(am5map.MapLineSeries.new(root, {}));
    lineSeries.mapLines.template.setAll({
      stroke: root.interfaceColors.get("alternativeBackground"),
      strokeOpacity: 0.3,
    });

    // Create point series for markers
    let pointSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));
    let colorset = am5.ColorSet.new(root, {});

    pointSeries.bullets.push(() => {
      let container = am5.Container.new(root, {
        tooltipText: "{title}",
        cursorOverStyle: "pointer",
      });

      container.events.on("click", (e) => {
        window.location.href = (e.target.dataItem?.dataContext as any).url;
      });

      let circle = container.children.push(
        am5.Circle.new(root, {
          radius: 4,
          tooltipY: 0,
          fill: colorset.next(),
          strokeOpacity: 0,
        }),
      );

      let circle2 = container.children.push(
        am5.Circle.new(root, {
          radius: 4,
          tooltipY: 0,
          fill: colorset.next(),
          strokeOpacity: 0,
          tooltipText: "{title}",
        }),
      );

      circle.animate({
        key: "scale",
        from: 1,
        to: 5,
        duration: 600,
        easing: am5.ease.out(am5.ease.cubic),
        loops: Infinity,
      });
      circle.animate({
        key: "opacity",
        from: 1,
        to: 0.1,
        duration: 600,
        easing: am5.ease.out(am5.ease.cubic),
        loops: Infinity,
      });

      return am5.Bullet.new(root, {
        sprite: container,
      });
    });

    let cities = [
      { title: "Brussels", latitude: 50.8371, longitude: 4.3676, url: "#" },
      { title: "Copenhagen", latitude: 55.6763, longitude: 12.5681, url: "#" },
      { title: "Paris", latitude: 48.8567, longitude: 2.351, url: "#" },
      { title: "Reykjavik", latitude: 64.1353, longitude: -21.8952, url: "#" },
      { title: "Moscow", latitude: 55.7558, longitude: 37.6176, url: "#" },
      { title: "Madrid", latitude: 40.4167, longitude: -3.7033, url: "#" },
      { title: "London", latitude: 51.5002, longitude: -0.1262, url: "#" },
      { title: "Peking", latitude: 39.9056, longitude: 116.3958, url: "#" },
      { title: "New Delhi", latitude: 28.6353, longitude: 77.225, url: "#" },
      { title: "Tokyo", latitude: 35.6785, longitude: 139.6823, url: "#" },
      { title: "Ankara", latitude: 39.9439, longitude: 32.856, url: "#" },
      {
        title: "Buenos Aires",
        latitude: -34.6118,
        longitude: -58.4173,
        url: "#",
      },
      { title: "Brasilia", latitude: -15.7801, longitude: -47.9292, url: "#" },
      { title: "Ottawa", latitude: 45.4235, longitude: -75.6979, url: "#" },
      { title: "Washington", latitude: 38.8921, longitude: -77.0241, url: "#" },
      { title: "Kinshasa", latitude: -4.3369, longitude: 15.3271, url: "#" },
      { title: "Cairo", latitude: 30.0571, longitude: 31.2272, url: "#" },
      { title: "Pretoria", latitude: -25.7463, longitude: 28.1876, url: "#" },
    ];

    cities.forEach((city) => {
      addCity(city.longitude, city.latitude, city.title, city.url);
    });

    function addCity(
      longitude: number,
      latitude: number,
      title: string,
      url: string,
    ) {
      pointSeries.data.push({
        url: url,
        geometry: { type: "Point", coordinates: [longitude, latitude] },
        title: title,
      });
    }

    // Make stuff animate on load
    chart.appear(1000, 100);

    // Cleanup on component unmount
    return () => {
      root.dispose();
    };
  }, [isGlobeView]);

  return (
    <>
      <div
        id="pulsingmapdiv"
        style={{
          width: "100%",
          height: "200px",
          position: "relative",
          borderRadius: "18px",
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          top: "-20px",
          right: 0,
          zIndex: 99,
          display: "flex",
          alignItems: "center",
          gap: "10px",
          color: "#FFFFFF",
          fontFamily: "Arial, sans-serif",
          fontSize: "14px",
        }}
      >
        <button
          onClick={() => setIsGlobeView(!isGlobeView)}
          style={{
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
            color: "#FFFFFF",
          }}
        >
          {isGlobeView ? "Switch to Map" : "Switch to Globe"}
        </button>
      </div>
    </>
  );
};
