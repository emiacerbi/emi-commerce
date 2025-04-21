import { getServerSession } from "next-auth";

import Product from "@/components/Product";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/prisma";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const products = await prisma.product.findMany();

  const safeProducts = products.map(product => ({
    ...product,
    price: product.price.toNumber(),
  }));

  const favorites = await prisma.favorite.findMany({
    where: { User: { email: session?.user?.email || "" } },
  });

  return (
    <div className="grid grid-cols-4 mt-4">  
      {safeProducts.map(product => {
        return (
          <Product
            key={product.id}
            id={product.id}
            name={product.name}
            description={product.description}
            stock={product.stock}
            image={product.image}
            favorites={favorites}
            price={product.price} 
          />
        );
      })}
    </div>
  );
}
