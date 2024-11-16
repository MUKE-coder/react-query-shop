// app/seed/page.tsx
"use client";

import { seedProducts } from "@/actions/products";
import { useState } from "react";

export default function SeedPage() {
  const [status, setStatus] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSeed = async () => {
    setIsLoading(true);
    try {
      const result = await seedProducts();
      setStatus(result.message);
    } catch (error) {
      setStatus("Failed to seed products");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Seed Products</h1>
      <button
        onClick={handleSeed}
        disabled={isLoading}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {isLoading ? "Seeding..." : "Seed 100 Products"}
      </button>
      {status && <p className="mt-4">{status}</p>}
    </div>
  );
}
