"use client";

import { useProduct } from "@/hooks/useProduct";
import Image from "next/image";
import { notFound } from "next/navigation";
import { use } from "react";

export default function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Unwrap the params Promise using React.use()
  const { id } = use(params);

  const { data: productData, isLoading, isError, error } = useProduct(id);

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="animate-pulse bg-gray-200 rounded-lg h-96" />
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse" />
            <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse" />
            <div className="h-24 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    if (error instanceof Error && error.message === "Product not found") {
      notFound();
    }
    return (
      <div className="max-w-2xl mx-auto py-8 px-4 text-center text-red-600">
        Error loading product
      </div>
    );
  }

  const product = productData?.data;

  if (!product) {
    return notFound();
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="aspect-w-1 aspect-h-1">
          <Image
            src={`/photo.png`}
            alt={product.title}
            width={800}
            height={800}
            className=" w-full object-contain rounded-lg"
            priority
          />
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
          <p className="text-2xl text-gray-900">${product.price.toFixed(2)}</p>

          {/* Add any additional product details here */}
          <div className="border-t pt-6">
            <p className="text-gray-600">Product ID: {product.id}</p>
            <p className="text-gray-600">
              Added on: {new Date(product.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
