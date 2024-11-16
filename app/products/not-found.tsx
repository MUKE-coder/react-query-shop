// app/products/[id]/not-found.tsx
export default function ProductNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Product Not Found
        </h1>
        <p className="text-gray-600 mb-6">
          The product you're looking for doesn't exist.
        </p>
        <a href="/" className="text-blue-600 hover:text-blue-800">
          Back to Products
        </a>
      </div>
    </div>
  );
}
