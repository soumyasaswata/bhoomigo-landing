"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

const LocationPickerMap = dynamic(() => import("./LocationPickerMap"), { ssr: false });

export default function LocationPicker({
  lat,
  lng,
  onChange,
}: {
  lat: number | null;
  lng: number | null;
  onChange: (lat: number, lng: number) => void;
}) {
  const [locating, setLocating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function useMyLocation() {
    if (!navigator.geolocation) {
      setError("Your browser doesn't support location.");
      return;
    }
    setLocating(true);
    setError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        onChange(pos.coords.latitude, pos.coords.longitude);
        setLocating(false);
      },
      () => {
        setError("Couldn't get your location. You can tap the map instead to set it.");
        setLocating(false);
      }
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm text-earth-800">
          {lat === null ? (
            <>
              Shop location not added yet <span className="text-amber-600">— add it so buyers can find you</span>
            </>
          ) : (
            "Shop location"
          )}
        </span>
        <button
          type="button"
          onClick={useMyLocation}
          disabled={locating}
          className="text-sm text-accent hover:underline disabled:opacity-50"
        >
          {locating ? "Locating..." : "Use my current location"}
        </button>
      </div>

      <LocationPickerMap lat={lat} lng={lng} onChange={onChange} />

      <p className="text-xs text-earth-800/60">
        {lat !== null && lng !== null
          ? `Pinned at ${lat.toFixed(6)}, ${lng.toFixed(6)} - drag the pin or tap the map to adjust.`
          : "Tap the map or use your current location to set your shop's pin."}
      </p>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
