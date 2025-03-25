"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  id: string;
  name: string;
  description: string;
  stock: number;
  image: string;
};

const Product: React.FC<Props> = ({ id, name, description, stock, image }) => {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string | number>("");

  console.log(typeof inputValue)

  const handleEditClick = (field: string, currentValue: string | number) => {
    setEditingField(field);
    setInputValue(currentValue);
  };

  const handleCancel = () => {
    setEditingField(null);
    setInputValue("");
  };
 
  const handleUpdate = async () => {
    if (!editingField) return;

    const formatedData = editingField === "stock" ? Number(inputValue) : inputValue   

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [editingField]: formatedData }),
      });

      if (!res.ok) {
        throw new Error("Failed to update product");
      }

      setEditingField(null);
      window.location.reload();
    } catch (err) {
      console.error("Error updating product:", err);
    }
  };

  return (
    <article key={id} className="border p-4 rounded-lg shadow-md">
      {/* Name */}
      <div className="flex items-center gap-2">
        {editingField === "name" ? (
          <>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="border p-1"
            />
            <button onClick={handleUpdate} className="bg-green-500 px-2 py-1 text-white">Save</button>
            <button onClick={handleCancel} className="bg-red-500 px-2 py-1 text-white">Cancel</button>
          </>
        ) : (
          <>
            <p>{name}</p>
            <button onClick={() => handleEditClick("name", name)} className="text-blue-500">Edit</button>
          </>
        )}
      </div>

      {/* Description */}
      <div className="flex items-center gap-2">
        {editingField === "description" ? (
          <>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="border p-1"
            />
            <button onClick={handleUpdate} className="bg-green-500 px-2 py-1 text-white">Save</button>
            <button onClick={handleCancel} className="bg-red-500 px-2 py-1 text-white">Cancel</button>
          </>
        ) : (
          <>
            <p>{description}</p>
            <button onClick={() => handleEditClick("description", description)} className="text-blue-500">Edit</button>
          </>
        )}
      </div>

      {/* Stock */}
      <div className="flex items-center gap-2">
        {editingField === "stock" ? (
          <>
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="border p-1"
            />
            <button onClick={handleUpdate} className="bg-green-500 px-2 py-1 text-white">Save</button>
            <button onClick={handleCancel} className="bg-red-500 px-2 py-1 text-white">Cancel</button>
          </>
        ) : (
          <>
            <p>Stock: {stock}</p>
            <button onClick={() => handleEditClick("stock", stock)} className="text-blue-500">Edit</button>
          </>
        )}
      </div>

      {/* Product Image */}
      <Image src={image} alt={name} width={200} height={100} className="rounded-md mt-2" />
    </article>
  );
};

export default Product;
