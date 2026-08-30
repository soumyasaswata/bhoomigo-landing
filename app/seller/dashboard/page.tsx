"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiRequest, clearTokens, getAccessToken } from "@/lib/api";

type InventoryItem = {
  id: number;
  zone: number;
  name: string;
  description: string;
  sku: string;
  size: string | null;
  unit: string;
  price: string;
};

type StockRow = {
  id: number;
  item: number;
  item_detail: InventoryItem;
  quantity: string;
  updated_at: string;
};

const UNIT_OPTIONS = [
  { value: "kg", label: "Kilogram (kg)" },
  { value: "ton", label: "Ton" },
  { value: "bag", label: "Bag" },
  { value: "piece", label: "Piece" },
  { value: "sqft", label: "Square Feet" },
  { value: "cft", label: "Cubic Feet" },
];

export default function SellerDashboardPage() {
  const router = useRouter();
  const [stocks, setStocks] = useState<StockRow[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    sku: "",
    size: "",
    unit: "bag",
    price: "",
    zone: "1",
    quantity: "0",
  });

  useEffect(() => {
    if (!getAccessToken()) {
      router.push("/seller/login");
      return;
    }
    loadInventory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadInventory() {
    setLoading(true);
    const { ok, status, data } = await apiRequest<StockRow[]>("/api/seller/inventory/", { auth: true });
    setLoading(false);

    if (status === 401) {
      clearTokens();
      router.push("/seller/login");
      return;
    }
    if (ok) setStocks(data);
  }

  function update(key: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleAddProduct(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const { ok, data } = await apiRequest<{ error?: string; [key: string]: unknown }>(
      "/api/seller/inventory/",
      {
        method: "POST",
        auth: true,
        body: {
          name: form.name,
          description: form.description,
          sku: form.sku,
          size: form.size,
          unit: form.unit,
          price: form.price,
          zone: Number(form.zone),
          quantity: form.quantity,
        },
      }
    );

    setSubmitting(false);

    if (!ok) {
      const firstError =
        data.error ??
        Object.values(data)
          .flat()
          .find((v) => typeof v === "string") ??
        "Could not add product.";
      setError(String(firstError));
      return;
    }

    setForm({ name: "", description: "", sku: "", size: "", unit: "bag", price: "", zone: "1", quantity: "0" });
    loadInventory();
  }

  function handleLogout() {
    clearTokens();
    router.push("/seller/login");
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-earth-950">My Products</h1>
        <button onClick={handleLogout} className="text-sm text-earth-800/70 hover:text-earth-950">
          Log out
        </button>
      </div>

      <section className="mt-8">
        {loading ? (
          <p className="text-earth-800/70">Loading...</p>
        ) : stocks.length === 0 ? (
          <p className="text-earth-800/70">No products yet. Add your first one below.</p>
        ) : (
          <ul className="divide-y divide-earth-800/10 rounded-md border border-earth-800/10">
            {stocks.map((s) => (
              <li key={s.id} className="flex justify-between px-4 py-3">
                <span>
                  {s.item_detail.name}{" "}
                  <span className="text-earth-800/50">
                    (₹{s.item_detail.price}/{s.item_detail.unit})
                  </span>
                </span>
                <span className="text-earth-800/70">
                  {s.quantity} {s.item_detail.unit}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-10">
        <h2 className="font-medium text-earth-950">Add a product</h2>
        <form onSubmit={handleAddProduct} className="mt-4 space-y-4">
          <label className="block">
            <span className="text-sm text-earth-800">Name</span>
            <input
              required
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              className="mt-1 w-full rounded-md border border-earth-800/20 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </label>
          <label className="block">
            <span className="text-sm text-earth-800">Description</span>
            <input
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              className="mt-1 w-full rounded-md border border-earth-800/20 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label className="block">
              <span className="text-sm text-earth-800">SKU</span>
              <input
                required
                value={form.sku}
                onChange={(e) => update("sku", e.target.value)}
                className="mt-1 w-full rounded-md border border-earth-800/20 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </label>
            <label className="block">
              <span className="text-sm text-earth-800">Size</span>
              <input
                value={form.size}
                onChange={(e) => update("size", e.target.value)}
                className="mt-1 w-full rounded-md border border-earth-800/20 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </label>
          </div>
          <label className="block">
            <span className="text-sm text-earth-800">Unit</span>
            <select
              value={form.unit}
              onChange={(e) => update("unit", e.target.value)}
              className="mt-1 w-full rounded-md border border-earth-800/20 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
            >
              {UNIT_OPTIONS.map((u) => (
                <option key={u.value} value={u.value}>
                  {u.label}
                </option>
              ))}
            </select>
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label className="block">
              <span className="text-sm text-earth-800">Price per {form.unit} (₹)</span>
              <input
                required
                type="number"
                step="0.01"
                value={form.price}
                onChange={(e) => update("price", e.target.value)}
                className="mt-1 w-full rounded-md border border-earth-800/20 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </label>
            <label className="block">
              <span className="text-sm text-earth-800">Quantity in stock ({form.unit})</span>
              <input
                required
                type="number"
                step="0.01"
                value={form.quantity}
                onChange={(e) => update("quantity", e.target.value)}
                className="mt-1 w-full rounded-md border border-earth-800/20 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </label>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-md bg-accent px-4 py-2 font-medium text-white hover:bg-accent-hover disabled:opacity-50"
          >
            {submitting ? "Adding..." : "Add product"}
          </button>
        </form>
      </section>
    </main>
  );
}
