"use client";

import { Favorite } from "@prisma/client";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useState } from "react";

type Props = {
  id: string;
  name: string;
  description: string;
  stock: number;
  image: string;
  price: number;
  isStoreOwner?: boolean
  favorites?: Favorite[]
};

const Product: React.FC<Props> = ({ id, name, description, stock, image, price, isStoreOwner = false, favorites }) => {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string | number>("");

  const isFavorited = favorites?.some((favorite) => favorite.productId === id);

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

  const handleFavorite = async () => {
    try {
      const res = await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: id }),
      });

      if (!res.ok) {
        signIn("google")
        throw new Error("Failed to add to favorites");
      }

      window.location.reload();
    } catch (err) {
      console.error("Error adding to favorites:", err);
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

      {/* Price */}
      <div className="flex items-center gap-2">
        {editingField === "price" ? (
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
            <p>Price: ${Number(price)}</p>
            { isStoreOwner && <button onClick={() => handleEditClick("price", price)} className="text-blue-500">Edit</button> }
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

      <button className="bg-blue-500 px-2 py-1 text-white cursor-pointer" onClick={() => handleFavorite()}>
        {isFavorited ? "Remove from favorites" : "Add to favorites"}
      </button>

      {/* Delete */}
      <div>
        { isStoreOwner && <button onClick={handleDelete} className="text-blue-500">Delete</button> }
      </div>
    </article>
  );
};

export default Product;
