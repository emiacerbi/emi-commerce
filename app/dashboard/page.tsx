import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import Grid from "@/components/Grid";
import Product from "@/components/Product";
import ProductForm from "@/components/ProductForm";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/prisma";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/");
  }

  const store = await prisma.store.findFirst({
    where: { owner: { email: session.user.email } },
    include: { products: true, owner: true }
  });

  const isStoreOwner = session?.user.email === store?.owner.email

  const favorites = await prisma.favorite.findMany({
    where: { User: { email: session.user.email } },
  });
  
  if (!store) {
    redirect("/");
  }

  const products = store.products

  const safeProducts = products.map(product => ({
    ...product,
    price: product.price.toNumber(),
  }));

  return (
    <div className="py-2">
      <h1>Welcome to your dashboard!</h1>
      <ProductForm storeId={store.id} />

      <h3>Tus productos</h3>
      <Grid>
        {safeProducts.map(product => (
          <Product 
            key={product.id}
            id={product.id}
            name={product.name} 
            description={product.description} 
            stock={product.stock} 
            image={product.image}
            price={product.price}
            isStoreOwner={isStoreOwner}
            favorites={favorites}
          />
        ))}
      </Grid>
    </div>
  );
}
