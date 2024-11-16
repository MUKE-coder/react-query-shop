// app/products/create/page.tsx
"use client";

import { useCreateProduct } from "@/hooks/useProducts";
import { useRouter } from "next/navigation";

export default function CreateProduct() {
  const { mutate, isPending } = useCreateProduct();
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    mutate({
      title: formData.get("title") as string,
      price: parseFloat(formData.get("price") as string),
    });

    router.push("/");
  };

  return (
    <div className=" m-8 max-w-3xl mx-auto border border-blue-500 p-8 shadow-lg">
      <h2 className="text-xl font-bold md:text-2xl text-center mb-3">
        Create New Product
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            className="border p-2 rounded w-full"
          />
        </div>

        <div>
          <label htmlFor="price" className="block">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            step="0.01"
            required
            className="border p-2 rounded w-full"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {isPending ? "Creating..." : "Create Product"}
        </button>
      </form>
    </div>
  );
}
