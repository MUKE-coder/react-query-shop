"use client";
import { useInfiniteProducts } from "@/hooks/useProducts";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";

// Mock product data
const products = [
  {
    id: 1,
    name: "Eco-friendly Water Bottle",
    price: 20,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    name: "Organic Cotton T-shirt",
    price: 30,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 3,
    name: "Recycled Paper Notebook",
    price: 15,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 4,
    name: "Bamboo Toothbrush Set",
    price: 12,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 5,
    name: "Reusable Produce Bags",
    price: 18,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 6,
    name: "Solar-powered Charger",
    price: 45,
    image: "/placeholder.svg?height=200&width=200",
  },
];

export default function ProductListing() {
  const { ref, inView } = useInView();

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteProducts();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading)
    return (
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-white overflow-hidden shadow rounded-lg animate-pulse"
              >
                <div className="p-4">
                  <div className="w-full h-48 bg-gray-200 mb-4" />
                  <div className="h-6 bg-gray-200 mb-2" />
                  <div className="h-4 bg-gray-200 mb-4 w-24" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );

  if (isError)
    return (
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="text-center text-red-600">Error loading products</div>
        </div>
      </div>
    );

  return (
    <>
      {data ? (
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {data.pages.map((page) =>
                page.data.map((product) => (
                  <Link
                    href={`/products/${product.id}`}
                    key={product.id}
                    className="bg-white overflow-hidden shadow rounded-lg"
                  >
                    <div className="p-4">
                      <Image
                        src={"/photo.png"}
                        alt={product.title}
                        width={512}
                        height={512}
                        className="w-full h-48 object-cover mb-4 rounded"
                      />
                      <h2 className="text-lg font-semibold text-gray-900 mb-2 truncate">
                        {product.title}
                      </h2>
                      <p className="text-gray-600">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>
                  </Link>
                ))
              )}
            </div>

            <div ref={ref} className="mt-8 text-center">
              {isFetchingNextPage && (
                <div className="flex justify-center items-center space-x-2">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900" />
                  <p>Loading More</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p>No Data Found</p>
        </div>
      )}
    </>
  );
}
