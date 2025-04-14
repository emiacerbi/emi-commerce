import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import Product from "@/components/Product";
import { prisma } from "@/prisma";

import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Favorites() {

  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    redirect("/");
  }

  const favorites = await prisma.favorite.findMany({
    where: { User: { email: session.user.email } },
    include: { Product: true },
  });
  
  const safeFavorites = favorites.map(fav => ({
    ...fav,
    Product: {
      ...fav.Product,
      price: fav.Product.price.toNumber(),
    },
  }));

  return (
    <div>
      <h1>Favorites</h1>
      <p>Loading your favorite items...</p>

      {safeFavorites.map(favorite => {
        const product = favorite.Product;
        return (
          <Product
            key={product.id}
            id={product.id}
            name={product.name}
            description={product.description}
            stock={product.stock}
            image={product.image}
            favorites={safeFavorites} 
            price={product.price}
          />
        );
      })}
    </div>
  );
}