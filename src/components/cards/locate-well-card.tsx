"use client";

import React, { FC } from "react";
// import { PuslingMapChart } from "../charts";
import { GiCancel } from "react-icons/gi";
import {
  AdvancedMarker,
  APIProvider,
  InfoWindow,
  Map,
  Marker,
  Pin,
} from "@vis.gl/react-google-maps";
import { ControlPanel } from "../ui/map-control-panel";
import { MovingMarker } from "../ui/map-moving-marker";
import { MarkerWithInfowindow } from "../ui/map-marker-with-info-window";

interface LocateWellCardProps {
  showMap: boolean | null;
  setShowMap: React.Dispatch<React.SetStateAction<boolean | null>>;
}

export const LocateWellCard: FC<LocateWellCardProps> = ({
  showMap,
  setShowMap,
}) => {
  return (
    <div className="h-full w-full rounded-2xl bg-[#297FB8]/10 px-[26px] py-[18px]">
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
        {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY && (
          // <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
          //   <Map
          //     style={{ width: "100%", height: "250px", borderRadius: "18px" }}
          //     defaultCenter={{ lat: 22.54992, lng: 0 }}
          //     defaultZoom={3}
          //     gestureHandling={"greedy"}
          //     disableDefaultUI={true}
          //   />
          // </APIProvider>

          <APIProvider
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
            libraries={["marker"]}
          >
            <Map
              mapId={"bf51a910020fa25a"}
              defaultZoom={3}
              defaultCenter={{ lat: 12, lng: 0 }}
              gestureHandling={"greedy"}
              disableDefaultUI
              style={{ width: "100%", height: "250px", borderRadius: "18px" }}
            >
              {/* simple marker */}
              <Marker
                position={{ lat: 10, lng: 10 }}
                clickable={true}
                onClick={() => alert("marker was clicked!")}
                title={"clickable google.maps.Marker"}
              />

              {/* advanced marker with customized pin */}
              <AdvancedMarker
                position={{ lat: 20, lng: 10 }}
                title={"AdvancedMarker with customized pin."}
              >
                <Pin
                  background={"#22ccff"}
                  borderColor={"#1e89a1"}
                  glyphColor={"#0f677a"}
                ></Pin>
              </AdvancedMarker>

              {/* advanced marker with html pin glyph */}
              <AdvancedMarker
                position={{ lat: 15, lng: 20 }}
                title={"AdvancedMarker with customized pin."}
              >
                <Pin background={"#22ccff"} borderColor={"#1e89a1"} scale={1.4}>
                  {/* children are rendered as 'glyph' of pin */}
                  👀
                </Pin>
              </AdvancedMarker>

              {/* advanced marker with html-content */}
              <AdvancedMarker
                position={{ lat: 30, lng: 10 }}
                title={"AdvancedMarker with custom html content."}
              >
                <div
                  style={{
                    width: 16,
                    height: 16,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    background: "#1dbe80",
                    border: "2px solid #0e6443",
                    borderRadius: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                ></div>
              </AdvancedMarker>

              {/* simple positioned infowindow */}
              <InfoWindow position={{ lat: 40, lng: 0 }} maxWidth={200}>
                <p>
                  This is the content for another infowindow with <em>HTML</em>
                  -elements.
                </p>
              </InfoWindow>

              {/* continously updated marker */}
              <MovingMarker />

              {/* simple stateful infowindow */}
              <MarkerWithInfowindow />
            </Map>

            <ControlPanel />
          </APIProvider>
        )}
      </div>
    </div>
  );
};
