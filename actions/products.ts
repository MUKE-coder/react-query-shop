"use server";

import { prisma } from "@/prisma/db";
import { Product } from "@prisma/client";

const productNames = [
  "Smartphone",
  "Laptop",
  "Headphones",
  "Smart Watch",
  "Tablet",
  "Camera",
  "Speaker",
  "Monitor",
  "Keyboard",
  "Mouse",
];

const brandNames = [
  "TechPro",
  "EliteGear",
  "SmartLife",
  "FutureTech",
  "InnovateX",
  "PrimeDigital",
  "NextGen",
  "UltraCore",
  "PowerTech",
  "MaxiGear",
];

export async function seedProducts() {
  try {
    // Clear existing products
    await prisma.product.deleteMany();

    const products = Array.from({ length: 100 }).map((_, index) => {
      const productName =
        productNames[Math.floor(Math.random() * productNames.length)];
      const brandName =
        brandNames[Math.floor(Math.random() * brandNames.length)];
      const price = parseFloat((Math.random() * (1999 - 49) + 49).toFixed(2));

      return {
        title: `${brandName} ${productName} ${Math.floor(
          Math.random() * 1000
        )}`,
        price,
      };
    });

    await prisma.product.createMany({
      data: products,
    });

    return { success: true, message: "Successfully seeded 100 products" };
  } catch (error) {
    console.error("Error seeding products:", error);
    return { success: false, message: "Failed to seed products" };
  }
}

const LIMIT = 10;

export async function getProducts({
  pageParam = 0,
}: {
  pageParam: number;
}): Promise<{
  data: Product[];
  currentPage: number;
  nextPage: number | null;
}> {
  const items = await prisma.product.findMany({
    take: LIMIT,
    skip: pageParam,
    orderBy: {
      createdAt: "desc",
    },
  });

  const total = await prisma.product.count();

  return {
    data: items,
    currentPage: pageParam,
    nextPage: pageParam + LIMIT < total ? pageParam + LIMIT : null,
  };
}

export async function createProduct(data: { title: string; price: number }) {
  try {
    const product = await prisma.product.create({
      data,
    });
    return { success: true, data: product };
  } catch (error) {
    return { success: false, error: "Failed to create product" };
  }
}

export async function getProduct(id: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    return {
      data: product,
    };
  } catch (error) {
    throw new Error("Failed to fetch product");
  }
}
