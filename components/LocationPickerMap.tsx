"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Leaflet's default marker icon paths break under bundlers - point at the CDN instead.
const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const DEFAULT_CENTER: [number, number] = [20.7706, 86.1497]; // Odisha, matches the business's own location

function Recenter({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], map.getZoom());
  }, [lat, lng, map]);
  return null;
}

function ClickHandler({ onPick }: { onPick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onPick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export default function LocationPickerMap({
  lat,
  lng,
  onChange,
}: {
  lat: number | null;
  lng: number | null;
  onChange: (lat: number, lng: number) => void;
}) {
  const position: [number, number] = lat !== null && lng !== null ? [lat, lng] : DEFAULT_CENTER;

  return (
    <div className="h-64 w-full overflow-hidden rounded-md border border-earth-800/20">
      <MapContainer center={position} zoom={13} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ClickHandler onPick={onChange} />
        {lat !== null && lng !== null && (
          <>
            <Marker
              position={[lat, lng]}
              icon={markerIcon}
              draggable
              eventHandlers={{
                dragend: (e) => {
                  const m = e.target.getLatLng();
                  onChange(m.lat, m.lng);
                },
              }}
            />
            <Recenter lat={lat} lng={lng} />
          </>
        )}
      </MapContainer>
    </div>
  );
}
