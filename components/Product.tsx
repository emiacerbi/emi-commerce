"use client";

import { Favorite } from "@prisma/client";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useState } from "react";

import { useCart } from "@/context/CartContext";

import Edit from "./Icons/Edit";
import Heart from "./Icons/Heart";
import Trashcan from "./Icons/Trashcan";

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
  const [wasAdded, setWasAdded] = useState(false);
  
  const { addToCart } = useCart()

  const isFavorited = favorites?.some((favorite) => favorite.productId === id);

  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name,
    description,
    price,
    stock
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
  };

  const handleUpdate = async () => {
    const updatedFields: Partial<typeof formData> = {};
  
    if (formData.name !== name) updatedFields.name = formData.name;
    if (formData.description !== description) updatedFields.description = formData.description;
    if (formData.price !== price) updatedFields.price = formData.price;
    if (formData.stock !== stock) updatedFields.stock = formData.stock;
  
    if (Object.keys(updatedFields).length === 0) {
      setEditing(false);
      return; 
    }
  
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFields),
      });
  
      if (!res.ok) throw new Error("Failed to update product");
  
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
    <article key={id} className="flex flex-col gap-2 group relative w-[283px] text-sm ">
      {/* Product Image */}
      <div className="w-full aspect-square relative overflow-hidden">
        <Image src={image} alt={name} fill  className="object-cover duration-500 group-hover:scale-105" />
      </div>

      <div className="flex justify-between">
        {/* Name */}
        <div className="flex items-center gap-2">
          {editing ? (
            <input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="border p-1 w-36"
            />
          ) : (
            <p className="font-bold">{name}</p>
          )}

        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          {editing ? (
            <input
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="border p-1 w-36"
            />
          ) : (
            <p className="text-gray-500">${price}</p>
          )}

        </div>
      </div>

      {/* Description */}
      {editing ? (
        <input
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="border p-1 w-36"
        />
      ) : (
        <p className="">{description}</p>
      )}

      {/* Stock */}
      {/* {editing ? (
        <input
          name="name"
          value={formData.stock}
          onChange={handleInputChange}
          className="border p-1 w-36"
        />
      ) : (
        <p className="">{stock}</p>
      )} */}

      <button
        className="absolute end-4 top-4 z-10 rounded-full cursor-pointer bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75"
        onClick={() => handleFavorite()}
      >
        <span className="sr-only">Wishlist</span>
        <Heart isFavorited={isFavorited}/>
      </button>

      <div className="flex items-center justify-between">
        {isStoreOwner && (
          <div className="flex gap-2">
            {editing ? (
              <>
                <button onClick={handleUpdate} className="bg-green-500 px-2 py-1 text-white">Save</button>
                <button onClick={() => {
                  setFormData({ name, description, price, stock });
                  setEditing(false);
                }} className="bg-red-500 px-2 py-1 text-white">Cancel</button>
              </>
            ) : (
              <button onClick={() => setEditing(true)} className="rounded-full cursor-pointer bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75 flex items-center gap-2">
                <Edit />
                Editar 
              </button>
            )}
          </div>
        )}

        {/* Delete */}
        { isStoreOwner && <button onClick={handleDelete} className="cursor-pointer p-1.5 bg-white rounded-full flex items-center gap-2">
          <Trashcan />
          Borrar 
        </button> }
      </div>


      <button 
        onClick={() => {
          setWasAdded(true)
          setTimeout(() => {
            setWasAdded(false);
          }, 2000);
          addToCart({ id, name, description, stock, image, price })}
        }
        className=" bg-gray-200 text-xs px-4 py-2 rounded-md font-semibold hover:bg-gray-300 transition duration-200">
        {wasAdded ? "Added to cart" : "Add to cart"}
      </button>
    </article>
  );
};

export default Product;
