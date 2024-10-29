"use client";

import React, { FC, useEffect, useState } from "react";
// import { PuslingMapChart } from "../charts";
import { GiCancel } from "react-icons/gi";
import {
  AdvancedMarker,
  APIProvider,
  // InfoWindow,
  Map,
  // Marker,
  Pin,
} from "@vis.gl/react-google-maps";
import { ControlPanel } from "../ui/map-control-panel";
// import { MovingMarker } from "../ui/map-moving-marker";
// import { MarkerWithInfowindow } from "../ui/map-marker-with-info-window";
import axios from "axios";
import { toast } from "react-toastify";
import { Site } from "@/types";

// hms: "51° 7' 4\" N, 111° 50' 50\" W";
// lat: 51.11784;
// lng: -111.830605;

interface LocateWellCardProps {
  showMap: boolean | null;
  setShowMap: React.Dispatch<React.SetStateAction<boolean | null>>;
  sitesData: Site[] | Site;
}

interface MarkerPosition {
  lat: number;
  lng: number;
  hms?: string;
  siteName?: string;
}

export const LocateWellCard: FC<LocateWellCardProps> = ({
  showMap,
  setShowMap,
  sitesData,
}) => {
  const [markerPositions, setMarkerPositions] = useState<
    MarkerPosition[] | MarkerPosition | null
  >(null);

  const fetchCoordinates = async (lsd: string) => {
    try {
      const response = await axios.get(
        `https://www.gridatlas.com/api/public/v2/ga_58beaba6fbd/lookup/lsd/${encodeURIComponent(lsd)}`
      );
      const gpsData = response.data.data.queries[0].result.gps;

      if (!gpsData || !gpsData.lng || !gpsData.lat) {
        toast.error(`Invalid LSD: ${lsd}, no GPS data found`);
        return null;
      }

      return gpsData;
    } catch (error) {
      console.error("Error fetching coordinates for LSD:", lsd, error);
      return null;
    }
  };

  // Function to fetch coordinates for all sites concurrently
  const loadMarkerPositions = async () => {
    if (Array.isArray(sitesData)) {
      try {
        const fetchPromises = sitesData.map((site) =>
          fetchCoordinates(site.location)
        );
        const results = await Promise.all(fetchPromises);

        const markers = results
          .filter((gpsData) => gpsData)
          .map((gpsData, index) => ({
            lat: gpsData.lat,
            lng: gpsData.lng,
            hms: gpsData.hms,
            siteName: sitesData[index].name,
          }));

        setMarkerPositions(markers);
      } catch (error) {
        console.error("Error loading marker positions:", error);
        toast.error("Error fetching marker positions");
      }
    } else {
      try {
        const results = await fetchCoordinates(sitesData.location);

        const markers = {
          lat: results.lat,
          lng: results.lng,
          hms: results.hms,
          siteName: sitesData.name,
        };

        setMarkerPositions(markers);
      } catch (error) {
        console.error("Error loading marker positions:", error);
        toast.error("Error fetching marker positions");
      }
    }
  };

  useEffect(() => {
    if (Array.isArray(sitesData) && sitesData.length > 0) {
      loadMarkerPositions();
    } else if (sitesData) {
      loadMarkerPositions();
    }
  }, [sitesData]);

  console.log("markerPositions", markerPositions);

  if (
    !markerPositions ||
    (Array.isArray(markerPositions) && markerPositions.length < 1)
  ) {
    return (
      <div className="h-full w-full rounded-2xl bg-[#297FB8]/10 px-[26px] py-[18px]">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-base font-medium text-[#E2E2E2]">
              Locate Well
            </h1>
            <p className="text-xs font-normal text-[#BCBCBC]">
              (Click on map to expand)
            </p>
          </div>
          {showMap && (
            <GiCancel
              onClick={() => setShowMap(null)}
              size={20}
              color="red"
              className="cursor-pointer"
            />
          )}
        </div>
        <div className="my-4 h-full w-full text-center">
          No site location available
        </div>
      </div>
    );
  }
  return (
    <div className="h-full min-h-[350px] w-full rounded-2xl bg-[#297FB8]/10 px-[26px] py-[18px]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-base font-medium text-[#E2E2E2]">Locate Well</h1>
          <p className="text-xs font-normal text-[#BCBCBC]">
            (Click on map to expand)
          </p>
        </div>
        {showMap && (
          <GiCancel
            onClick={() => setShowMap(null)}
            size={20}
            color="red"
            className="cursor-pointer"
          />
        )}
      </div>

      <div
        onClick={() => setShowMap(true)}
        className="relative h-full pt-3 text-black"
      >
        {/* <PuslingMapChart /> */}
        {!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY && (
          <div className="flex justify-center text-base font-medium">
            Failed to load maps api key
          </div>
        )}
        {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY &&
          markerPositions &&
          Array.isArray(markerPositions) &&
          markerPositions.length > 0 && (
            <APIProvider
              apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
              libraries={["marker"]}
            >
              <Map
                mapId={"bf51a910020fa25a"}
                defaultZoom={3}
                defaultCenter={{
                  lat: markerPositions[0].lat,
                  lng: markerPositions[0].lng,
                }}
                gestureHandling={"greedy"}
                disableDefaultUI
                style={{
                  width: "100%",
                  height: "250px",
                  borderRadius: "18px",
                }}
              >
                {markerPositions.map((position, idx) => (
                  <AdvancedMarker
                    key={idx}
                    position={{
                      lat: position.lat,
                      lng: position.lng,
                    }}
                    title={"Site location"}
                  >
                    <Pin
                      background={"#22ccff"}
                      borderColor={"#1e89a1"}
                      glyphColor={"#0f677a"}
                    ></Pin>
                  </AdvancedMarker>
                ))}
              </Map>

              <ControlPanel />
            </APIProvider>
          )}

        {/* secondly  */}

        {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY &&
          markerPositions &&
          !Array.isArray(markerPositions) && (
            <APIProvider
              apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
              libraries={["marker"]}
            >
              <Map
                mapId={"bf51a910020fa25a"}
                defaultZoom={3}
                defaultCenter={{
                  lat: markerPositions.lat,
                  lng: markerPositions.lng,
                }}
                gestureHandling={"greedy"}
                disableDefaultUI
                style={{
                  width: "100%",
                  height: "250px",
                  borderRadius: "18px",
                }}
              >
                <AdvancedMarker
                  position={{
                    lat: markerPositions.lat,
                    lng: markerPositions.lng,
                  }}
                  title={"Site location"}
                >
                  <Pin
                    background={"#22ccff"}
                    borderColor={"#1e89a1"}
                    glyphColor={"#0f677a"}
                  ></Pin>
                </AdvancedMarker>
              </Map>

              <ControlPanel />
            </APIProvider>
          )}
      </div>
    </div>
  );
};

// <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
//   <Map
//     style={{ width: "100%", height: "250px", borderRadius: "18px" }}
//     defaultCenter={{ lat: 22.54992, lng: 0 }}
//     defaultZoom={3}
//     gestureHandling={"greedy"}
//     disableDefaultUI={true}
//   />
// </APIProvider>

//  {
//    /* simple marker */
//  }
//  <Marker
//    position={{ lat: markerPosition.lat, lng: markerPosition.lng }}
//    clickable={true}
//    onClick={() => alert("marker was clicked!")}
//    title={"Site location"}
//  />;

// {
//   /* advanced marker with html pin glyph */
// }
// <AdvancedMarker
//   position={{ lat: 15, lng: 20 }}
//   title={"AdvancedMarker with customized pin."}
// >
//   <Pin background={"#22ccff"} borderColor={"#1e89a1"} scale={1.4}>
//     {/* children are rendered as 'glyph' of pin */}
//     👀
//   </Pin>
// </AdvancedMarker>;

// {
//   /* advanced marker with html-content */
// }
// <AdvancedMarker
//   position={{ lat: 30, lng: 10 }}
//   title={"AdvancedMarker with custom html content."}
// >
//   <div
//     style={{
//       width: 16,
//       height: 16,
//       position: "absolute",
//       top: 0,
//       left: 0,
//       background: "#1dbe80",
//       border: "2px solid #0e6443",
//       borderRadius: "50%",
//       transform: "translate(-50%, -50%)",
//     }}
//   ></div>
// </AdvancedMarker>;

// {
//   /* simple positioned infowindow */
// }
// <InfoWindow position={{ lat: 40, lng: 0 }} maxWidth={200}>
//   <p>
//     This is the content for another infowindow with <em>HTML</em>
//     -elements.
//   </p>
// </InfoWindow>;

// {
//   /* continously updated marker */
// }
// <MovingMarker />;

// {
//   /* simple stateful infowindow */
// }
// <MarkerWithInfowindow />;
