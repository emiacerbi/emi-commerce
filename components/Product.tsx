"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  id: string;
  name: string;
  description: string;
  stock: number;
  image: string;
  isStoreOwner?: boolean
};

const Product: React.FC<Props> = ({ id, name, description, stock, image, isStoreOwner = false }) => {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string | number>("");

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

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      window.location.reload();

      if (!res.ok) {
        throw new Error("Failed to delete product");
      }
    } catch (err) {
      console.error ("Error deleting product", err)
    }
  }

  return (
    <article key={id} className="border flex flex-col gap-2 max-w-xs items-center p-4 rounded-lg shadow-md">

      {/* Product Image */}
      <Image src={image} alt={name} width={250} height={300} className="rounded-md" />
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
            { isStoreOwner && <button onClick={() => handleEditClick("name", name)} className="text-blue-500">Edit</button> }
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
            { isStoreOwner && <button onClick={() => handleEditClick("description", description)} className="text-blue-500">Edit</button> }
            
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
            { isStoreOwner && <button onClick={() => handleEditClick("stock", stock)} className="text-blue-500">Edit</button> }
          </>
        )}
      </div>

      {/* Delete */}
      <div>
        { isStoreOwner && <button onClick={handleDelete} className="text-blue-500">Delete</button> }
      </div>
    </article>
  );
};

export default Product;
