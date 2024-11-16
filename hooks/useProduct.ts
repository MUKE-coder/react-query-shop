// hooks/useProduct.ts
"use client";

import { getProduct } from "@/actions/products";
import { useQuery } from "@tanstack/react-query";

export function useProduct(id: string) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
    enabled: !!id, // Only run the query if we have an ID
  });
}
