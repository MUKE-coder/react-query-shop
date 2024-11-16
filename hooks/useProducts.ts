// hooks/useProducts.ts
"use client";

import { createProduct, getProducts } from "@/actions/products";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

export function useInfiniteProducts() {
  return useInfiniteQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}
