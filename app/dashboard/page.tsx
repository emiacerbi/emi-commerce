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
    include: { products: { include: { category: true } }, owner: true },
  });

  if (!store) {
    redirect("/");
  }

  const categories = await prisma.category.findMany({
    where: { storeId: store.id },
  });

  const isStoreOwner = session.user.email === store.owner.email;

  const favorites = await prisma.favorite.findMany({
    where: { User: { email: session.user.email } },
  });

  const products = store.products;

  const safeProducts = products.map(product => ({
    ...product,
    price: product.price.toNumber(),
  }));

  console.log("Safe Products:", safeProducts);

  return (
    <div className="py-8">
      <header className="text-center">
        <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">Dashboard</h1>
      </header>

      <ProductForm storeId={store.id} categories={categories} />

      <h3 className="mt-4">Productos creados</h3>
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
            category={product.category?.name}
            categories={categories}
          />
        ))}
      </Grid>
    </div>
  );
}
