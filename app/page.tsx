import ProductListing from "@/components/ProductListing";
import Image from "next/image";

export default function Home() {
  return (
    <div className="container max-w-5xl mx-auto">
      <ProductListing />
    </div>
  );
}
