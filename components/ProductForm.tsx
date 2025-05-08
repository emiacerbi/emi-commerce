"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Category = { id: string; name: string }

type Props = {
  storeId: string;
  categories: Category[];
};

export default function ProductForm({ storeId, categories }: Props) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    categoryId: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [category, setCategory] = useState("");

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

  const createCategory = async (e: React.SyntheticEvent) => {
    e.preventDefault(); 

    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: category.toLowerCase(), storeId }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData?.message || "Failed to create category");
      }

      alert("Categoría creada con éxito!");
    } catch (err) {
      alert("Hubo un problema creando la categoría");
      setError(`Error: ${err instanceof Error ? err.message : "Unknown error"}`);
    }
  }

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="grid grid-cols-2 border border-white mt-4 h-full gap-4">
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
          <input
            type="text"
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

        <label>
          <span className="text-sm font-semibold text-gray-700">Categoria</span>
          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
            className="mt-0.5 block w-full rounded border h-[38px] border-gray-300 shadow-sm sm:text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 py-2 px-3"
          >
            <option value="">Sin asignar</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name[0].toUpperCase() + c.name.slice(1)}</option>
            ))}
          </select>
        </label>

        <div className="flex items-end gap-4">
          <label htmlFor="category" className="w-full text-sm font-medium text-gray-700">
            <span className="text-sm font-semibold text-gray-700"> Crear categoría </span>
            <input
              type="text"
              name="category"
              id="category"
              placeholder="Remeras"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              className="mt-0.5 block w-full rounded border border-gray-300 shadow-sm sm:text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 py-2 px-3"
            />
          </label>
          <button
            type="button"
            className="rounded-md ml-auto bg-black px-4 h-[38px] text-white text-sm font-medium hover:bg-gray-800"
            onClick={createCategory}
          >
            Create
          </button>
        </div>

        <button 
          className="bg-gray-200 py-3 text-xs font-semibold rounded hover:bg-gray-300 transition duration-200" 
          type="submit" 
          disabled={loading}>
          {loading ? "Creating..." : "Crear "}
        </button>
      </form>
    </div>
  );
}
