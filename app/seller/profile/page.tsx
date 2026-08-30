"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiRequest, clearTokens, getAccessToken } from "@/lib/api";
import LocationPicker from "@/components/LocationPicker";

type SellerProfile = {
  company_name: string;
  company_address: string;
  company_city: string;
  company_state: string;
  company_pincode: string;
  latitude: string;
  longitude: string;
  gstin: string;
  pan: string;
  aadhar: string;
};

export default function SellerProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<SellerProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!getAccessToken()) {
      router.push("/seller/login");
      return;
    }
    (async () => {
      const { ok, status, data } = await apiRequest<SellerProfile>("/api/accounts/profile/seller/", { auth: true });
      setLoading(false);
      if (status === 401) {
        clearTokens();
        router.push("/seller/login");
        return;
      }
      if (ok) setProfile(data);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function update(key: keyof SellerProfile, value: string) {
    setProfile((p) => (p ? { ...p, [key]: value } : p));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!profile) return;
    setError(null);
    setSaved(false);
    setSaving(true);

    const { ok, data } = await apiRequest<SellerProfile & { error?: string; [key: string]: unknown }>(
      "/api/accounts/profile/seller/",
      { method: "PUT", auth: true, body: profile }
    );

    setSaving(false);

    if (!ok) {
      const firstError =
        (data as { error?: string }).error ??
        Object.values(data)
          .flat()
          .find((v) => typeof v === "string") ??
        "Could not save changes.";
      setError(String(firstError));
      return;
    }

    setProfile(data);
    setSaved(true);
  }

  if (loading) {
    return (
      <main className="mx-auto max-w-xl px-4 py-12">
        <p className="text-earth-800/70">Loading...</p>
      </main>
    );
  }

  if (!profile) {
    return (
      <main className="mx-auto max-w-xl px-4 py-12">
        <p className="text-earth-800/70">Could not load your profile.</p>
      </main>
    );
  }

  const hasLocation = Number(profile.latitude) !== 0 || Number(profile.longitude) !== 0;

  const field = (key: keyof SellerProfile, label: string, readOnly = false) => (
    <label className="block">
      <span className="text-sm text-earth-800">{label}</span>
      <input
        value={profile[key]}
        readOnly={readOnly}
        onChange={(e) => update(key, e.target.value)}
        className={`mt-1 w-full rounded-md border border-earth-800/20 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent ${
          readOnly ? "bg-earth-800/5 text-earth-800/60" : ""
        }`}
      />
    </label>
  );

  return (
    <main className="mx-auto max-w-xl px-4 py-12">
      <h1 className="text-2xl font-semibold text-earth-950">My Profile</h1>
      <p className="mt-1 text-earth-800/70">Update your company and location details.</p>

      <form onSubmit={handleSave} className="mt-8 space-y-4">
        {field("company_name", "Company name")}
        {field("company_address", "Company address")}
        <div className="grid grid-cols-3 gap-4">
          {field("company_city", "City")}
          {field("company_state", "State")}
          {field("company_pincode", "Pincode")}
        </div>

        <LocationPicker
          lat={hasLocation ? Number(profile.latitude) : null}
          lng={hasLocation ? Number(profile.longitude) : null}
          onChange={(lat, lng) => {
            update("latitude", String(lat));
            update("longitude", String(lng));
          }}
        />

        <hr className="border-earth-800/10" />
        <h2 className="font-medium text-earth-950">Registration details</h2>
        <p className="text-xs text-earth-800/60">
          These are fixed at signup and can&apos;t be changed here — contact support if any of these need
          correcting.
        </p>
        <div className="grid grid-cols-3 gap-4">
          {field("gstin", "GSTIN", true)}
          {field("pan", "PAN", true)}
          {field("aadhar", "Aadhar", true)}
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}
        {saved && (
          <div className="flex items-center gap-2 rounded-md border border-accent/30 bg-accent/10 px-4 py-3 text-sm font-medium text-accent-hover">
            <svg className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                clipRule="evenodd"
              />
            </svg>
            Your profile changes have been saved.
          </div>
        )}

        <button
          type="submit"
          disabled={saving}
          className="w-full rounded-md bg-accent px-4 py-2 font-medium text-white hover:bg-accent-hover disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save changes"}
        </button>
      </form>
    </main>
  );
}
