"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  storeId: string;
};

export default function ProductForm({ storeId }: Props) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, storeId }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData?.message || "Failed to create product");
      }

      router.refresh();
    } catch (err) {
      setError(`Error: ${err instanceof Error ? err.message : "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col border border-white max-w-[283px] h-full ">
        <h1>Create a Product</h1>

        <label htmlFor="Name">
          <span className="text-sm font-semibold text-gray-700"> Nombre </span>
          <input
            type="text"
            id="Name"
            name="name"
            onChange={handleChange}
            className="mt-0.5 w-full rounded border border-gray-300 shadow-sm sm:text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 py-2 px-3"
            value={formData.name}
            required
          />
        </label>


        <label htmlFor="Descripción">
          <span className="text-sm font-semibold text-gray-700"> Descripción </span>
          <textarea
            id="Descripción"
            name="description"
            onChange={handleChange}
            className="mt-0.5 w-full rounded border border-gray-300 shadow-sm sm:text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 py-2 px-3"
            value={formData.description}
            required
          />
        </label>

        <label htmlFor="Price">
          <span className="text-sm font-semibold text-gray-700"> Precio </span>
          <input
            type="number"
            id="Price"
            name="price"
            onChange={handleChange}
            value={formData.price}
            required
            className="mt-0.5 w-full rounded border border-gray-300 shadow-sm sm:text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 py-2 px-3"
          />
        </label>

        <label htmlFor="Imagen">
          <span className="text-sm font-semibold text-gray-700"> Imagen </span>
          <input
            type="text"
            id="Imagen"
            name="image"
            onChange={handleChange}
            value={formData.image}
            required
            className="mt-0.5 w-full rounded border border-gray-300 shadow-sm sm:text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 py-2 px-3"
          />
        </label>

        <button 
          className="mt-auto bg-gray-200 py-2 px-4 text-xs font-semibold rounded hover:bg-gray-300 transition duration-200" 
          type="submit" 
          disabled={loading}>
          {loading ? "Creating..." : "Create Product"}
        </button>
      </form>
    </div>
  );
}
