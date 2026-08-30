"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

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

  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState<{ display_name: string; lat: string; lon: string }[]>([]);

  // Editable lat/lng text boxes. Kept as separate string state (not derived directly
  // from the lat/lng props) so a half-typed value like "20.7" isn't clobbered on every
  // keystroke - synced from props whenever the coordinate changes from elsewhere
  // (search, geolocation, map click/drag).
  const [latInput, setLatInput] = useState(lat !== null ? String(lat) : "");
  const [lngInput, setLngInput] = useState(lng !== null ? String(lng) : "");
  const [coordError, setCoordError] = useState<string | null>(null);

  useEffect(() => {
    setLatInput(lat !== null ? String(lat) : "");
    setLngInput(lng !== null ? String(lng) : "");
  }, [lat, lng]);

  function commitCoordInputs(nextLatStr: string, nextLngStr: string) {
    const nextLat = parseFloat(nextLatStr);
    const nextLng = parseFloat(nextLngStr);

    if (nextLatStr.trim() === "" || nextLngStr.trim() === "") {
      setCoordError(null);
      return;
    }
    if (Number.isNaN(nextLat) || Number.isNaN(nextLng)) {
      setCoordError("Latitude and longitude must be numbers.");
      return;
    }
    if (nextLat < -90 || nextLat > 90) {
      setCoordError("Latitude must be between -90 and 90.");
      return;
    }
    if (nextLng < -180 || nextLng > 180) {
      setCoordError("Longitude must be between -180 and 180.");
      return;
    }

    setCoordError(null);
    handleChange(nextLat, nextLng);
  }

  // Geolocation/map events return far more decimal precision than the backend's
  // DecimalField(max_digits=9, decimal_places=6) allows - round here, once, for every source.
  function handleChange(newLat: number, newLng: number) {
    onChange(Number(newLat.toFixed(6)), Number(newLng.toFixed(6)));
  }

  async function handleSearch() {
    if (!query.trim()) return;
    setSearching(true);
    setError(null);
    setResults([]);

    try {
      const res = await fetch(`${API_URL}/api/sellers/geocode/?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      if (data.length === 0) {
        setError("No matching locations found. Try a different search, or tap the map directly.");
      }
      setResults(data);
    } catch {
      setError("Search failed. You can tap the map instead.");
    }

    setSearching(false);
  }

  function pickResult(r: { display_name: string; lat: string; lon: string }) {
    handleChange(parseFloat(r.lat), parseFloat(r.lon));
    setResults([]);
    setQuery(r.display_name);
  }

  function useMyLocation() {
    if (!navigator.geolocation) {
      setError("Your browser doesn't support location.");
      return;
    }
    setLocating(true);
    setError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        handleChange(pos.coords.latitude, pos.coords.longitude);
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

      <div className="relative flex gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSearch();
            }
          }}
          placeholder="Search for an address..."
          className="w-full rounded-md border border-earth-800/20 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
        />
        <button
          type="button"
          onClick={handleSearch}
          disabled={searching}
          className="shrink-0 rounded-md border border-earth-800/20 px-3 py-2 text-sm text-earth-800 hover:bg-earth-800/5 disabled:opacity-50"
        >
          {searching ? "Searching..." : "Search"}
        </button>

        {results.length > 0 && (
          <ul className="absolute top-full z-[1000] mt-1 w-full rounded-md border border-earth-800/20 bg-white shadow-lg">
            {results.map((r, i) => (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => pickResult(r)}
                  className="block w-full px-3 py-2 text-left text-sm hover:bg-earth-800/5"
                >
                  {r.display_name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <LocationPickerMap lat={lat} lng={lng} onChange={handleChange} />

      <div className="grid grid-cols-2 gap-4">
        <label className="block">
          <span className="text-xs text-earth-800">Latitude</span>
          <input
            value={latInput}
            onChange={(e) => setLatInput(e.target.value)}
            onBlur={() => commitCoordInputs(latInput, lngInput)}
            onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
            placeholder="e.g. 20.770600"
            inputMode="decimal"
            className="mt-1 w-full rounded-md border border-earth-800/20 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </label>
        <label className="block">
          <span className="text-xs text-earth-800">Longitude</span>
          <input
            value={lngInput}
            onChange={(e) => setLngInput(e.target.value)}
            onBlur={() => commitCoordInputs(latInput, lngInput)}
            onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
            placeholder="e.g. 86.149700"
            inputMode="decimal"
            className="mt-1 w-full rounded-md border border-earth-800/20 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </label>
      </div>

      <p className="text-xs text-earth-800/60">
        {lat === null && "Tap the map, search, or use your current location to set your shop's pin."}
      </p>
      {coordError && <p className="text-xs text-red-600">{coordError}</p>}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
