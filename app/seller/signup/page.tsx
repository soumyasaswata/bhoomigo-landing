"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiRequest, saveTokens } from "@/lib/api";

export default function SellerSignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    username: "",
    password: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    company_name: "",
    company_address: "",
    company_city: "",
    company_state: "",
    company_pincode: "",
    gstin: "",
    pan: "",
    aadhar: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function update(key: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { ok, data } = await apiRequest<{
      access?: string;
      refresh?: string;
      error?: string;
      [key: string]: unknown;
    }>("/api/auth/signup/seller/", { method: "POST", body: form });

    setLoading(false);

    if (!ok) {
      const firstError =
        data.error ??
        Object.values(data)
          .flat()
          .find((v) => typeof v === "string") ??
        "Signup failed. Please check your details.";
      setError(String(firstError));
      return;
    }

    saveTokens(data.access as string, data.refresh as string);
    router.push("/seller/dashboard");
  }

  const field = (
    key: keyof typeof form,
    label: string,
    type = "text"
  ) => (
    <label className="block">
      <span className="text-sm text-earth-800">{label}</span>
      <input
        type={type}
        required
        value={form[key]}
        onChange={(e) => update(key, e.target.value)}
        className="mt-1 w-full rounded-md border border-earth-800/20 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
      />
    </label>
  );

  return (
    <main className="mx-auto max-w-xl px-4 py-12">
      <h1 className="text-2xl font-semibold text-earth-950">Register as a Supplier</h1>
      <p className="mt-1 text-earth-800/70">List your products and reach construction buyers.</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {field("username", "Username")}
          {field("password", "Password", "password")}
        </div>
        <div className="grid grid-cols-2 gap-4">
          {field("email", "Email", "email")}
          {field("phone", "Phone (10 digits)")}
        </div>
        {field("address", "Address")}
        <div className="grid grid-cols-3 gap-4">
          {field("city", "City")}
          {field("state", "State")}
          {field("pincode", "Pincode")}
        </div>

        <hr className="border-earth-800/10" />
        <h2 className="font-medium text-earth-950">Company details</h2>

        {field("company_name", "Company name")}
        {field("company_address", "Company address")}
        <div className="grid grid-cols-3 gap-4">
          {field("company_city", "City")}
          {field("company_state", "State")}
          {field("company_pincode", "Pincode")}
        </div>
        <div className="grid grid-cols-3 gap-4">
          {field("gstin", "GSTIN")}
          {field("pan", "PAN")}
          {field("aadhar", "Aadhar")}
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-accent px-4 py-2 font-medium text-white hover:bg-accent-hover disabled:opacity-50"
        >
          {loading ? "Creating account..." : "Create seller account"}
        </button>

        <p className="text-sm text-earth-800/70">
          Already have an account?{" "}
          <a href="/seller/login" className="text-accent">
            Log in
          </a>
        </p>
      </form>
    </main>
  );
}
