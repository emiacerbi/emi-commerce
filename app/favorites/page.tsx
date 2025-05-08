import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import Grid from "@/components/Grid";
import Product from "@/components/Product";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/prisma";

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
    <div className="py-8">

      <header className="text-center">
        <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">Favoritos</h1>
      </header>

      {safeFavorites.length === 0 && (
        <p className="text-center font-semibold">Todavia no tienes productos en favoritos</p>
      )}
      
      <Grid>
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
      </Grid>
    </div>
  );
}