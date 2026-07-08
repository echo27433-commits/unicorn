"use client";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";
import { MapContainer, Marker, Polyline, Popup, TileLayer, useMap } from "react-leaflet";

import { locations, routeCoords, type Location } from "./locations";

function createMarkerIcon(active: boolean) {
  return L.divIcon({
    className: "",
    html: `
      <div class="map-marker ${active ? "map-marker--active" : ""}">
        <span class="map-marker__pulse"></span>
        <span class="map-marker__pulse map-marker__pulse--delayed"></span>
        <span class="map-marker__dot"></span>
      </div>
    `,
    iconSize: [48, 48],
    iconAnchor: [24, 24],
    popupAnchor: [0, -20],
  });
}

function MapController({
  activeIndex,
  mode,
  overviewKey,
}: {
  activeIndex: number;
  mode: "overview" | "focused";
  overviewKey: number;
}) {
  const map = useMap();

  useEffect(() => {
    if (mode === "overview") {
      const bounds = L.latLngBounds(locations.map((l) => [l.lat, l.lng]));
      map.fitBounds(bounds, { padding: [48, 48], maxZoom: 3, animate: true });
      return;
    }

    const loc = locations[activeIndex];
    if (!loc) return;

    map.flyTo([loc.lat, loc.lng], loc.zoom, {
      duration: 1.6,
      easeLinearity: 0.25,
    });
  }, [activeIndex, mode, overviewKey, map]);

  return null;
}

type LocationMapProps = {
  activeIndex: number;
  revealedCount: number;
  mode: "overview" | "focused";
  overviewKey: number;
  onSelect: (index: number) => void;
};

export default function LocationMap({
  activeIndex,
  revealedCount,
  mode,
  overviewKey,
  onSelect,
}: LocationMapProps) {
  return (
    <MapContainer
      center={[30, 20]}
      zoom={2}
      scrollWheelZoom
      className="h-full w-full"
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />

      <MapController activeIndex={activeIndex} mode={mode} overviewKey={overviewKey} />

      <Polyline
        positions={[...routeCoords, routeCoords[0]]}
        pathOptions={{
          color: "#FFAA00",
          weight: 2,
          opacity: 0.55,
          dashArray: "10 14",
        }}
      />

      {locations.map((loc, index) => {
        if (index >= revealedCount) return null;

        return (
          <AnimatedMarker
            key={loc.id}
            loc={loc}
            index={index}
            active={activeIndex === index}
            onSelect={onSelect}
          />
        );
      })}
    </MapContainer>
  );
}

function AnimatedMarker({
  loc,
  index,
  active,
  onSelect,
}: {
  loc: Location;
  index: number;
  active: boolean;
  onSelect: (index: number) => void;
}) {
  const markerRef = useRef<L.Marker>(null);

  useEffect(() => {
    const marker = markerRef.current;
    if (!marker) return;

    marker.setOpacity(0);
    marker.setZIndexOffset(active ? 1000 : 0);

    const frame = requestAnimationFrame(() => {
      marker.setOpacity(1);
    });

    return () => cancelAnimationFrame(frame);
  }, [active]);

  return (
    <Marker
      key={`${loc.id}-${active}`}
      ref={markerRef}
      position={[loc.lat, loc.lng]}
      icon={createMarkerIcon(active)}
      eventHandlers={{
        click: () => onSelect(index),
      }}
    >
      <Popup className="map-popup" closeButton={false}>
        <div className="map-popup__content">
          <p className="map-popup__country">{loc.country}</p>
          <p className="map-popup__city">{loc.city}</p>
          <p className="map-popup__tz">{loc.timezone}</p>
        </div>
      </Popup>
    </Marker>
  );
}
