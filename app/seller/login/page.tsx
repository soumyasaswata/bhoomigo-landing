"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { apiRequest, saveTokens } from "@/lib/api";

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "";

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: { credential: string }) => void;
          }) => void;
          renderButton: (parent: HTMLElement, options: { theme: string; size: string }) => void;
        };
      };
    };
  }
}

export default function SellerLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleGoogleCredential(idToken: string) {
    const { ok, data } = await apiRequest<{
      access?: string;
      refresh?: string;
      profile_complete?: boolean;
      error?: string;
    }>("/api/auth/google/", { method: "POST", body: { id_token: idToken } });

    if (!ok) {
      setError(data.error ?? "Google sign-in failed.");
      return;
    }

    saveTokens(data.access as string, data.refresh as string);
    router.push(data.profile_complete ? "/seller/dashboard" : "/seller/signup");
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (window.google && GOOGLE_CLIENT_ID) {
        clearInterval(interval);
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: (response) => handleGoogleCredential(response.credential),
        });
        const el = document.getElementById("google-btn");
        if (el) window.google.accounts.id.renderButton(el, { theme: "outline", size: "large" });
      }
    }, 300);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { ok, data } = await apiRequest<{
      access?: string;
      refresh?: string;
      error?: string;
    }>("/api/auth/login/", { method: "POST", body: { username, password, user_type: "seller" } });

    setLoading(false);

    if (!ok) {
      setError(data.error ?? "Login failed.");
      return;
    }

    saveTokens(data.access as string, data.refresh as string);
    router.push("/seller/dashboard");
  }

  return (
    <main className="mx-auto max-w-sm px-4 py-16">
      <h1 className="text-2xl font-semibold text-earth-950">Supplier Login</h1>

      <Script src="https://accounts.google.com/gsi/client" strategy="afterInteractive" />
      <div id="google-btn" className="mt-6 flex justify-center" />

      <div className="my-6 flex items-center gap-3 text-sm text-earth-800/50">
        <div className="h-px flex-1 bg-earth-800/10" />
        or
        <div className="h-px flex-1 bg-earth-800/10" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="text-sm text-earth-800">Username</span>
          <input
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 w-full rounded-md border border-earth-800/20 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </label>
        <label className="block">
          <span className="text-sm text-earth-800">Password</span>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-md border border-earth-800/20 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </label>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-accent px-4 py-2 font-medium text-white hover:bg-accent-hover disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Log in"}
        </button>

        <p className="text-sm text-earth-800/70">
          <a href="/forgot-password" className="text-accent">
            Forgot password?
          </a>
        </p>
        <p className="text-sm text-earth-800/70">
          New supplier?{" "}
          <a href="/seller/signup" className="text-accent">
            Register here
          </a>
        </p>
      </form>
    </main>
  );
}
