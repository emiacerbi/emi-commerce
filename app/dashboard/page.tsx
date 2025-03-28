import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Product from "@/components/Product";
import ProductForm from "@/components/ProductForm";
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

  if (!store) {
    redirect("/");
  }

  const products = store.products

  console.log(store)

  return (
    <div>
      <h1>Welcome to your dashboard!</h1>
      <p>Here you can create your products.</p>

      <ProductForm storeId={store.id} />

      <div className="grid grid-cols-3 mt-4">
        {products.map(product => (
          <Product 
            key={product.id}
            id={product.id}
            name={product.name} 
            description={product.description} 
            stock={product.stock} 
            image={product.image}
            isStoreOwner={isStoreOwner}
          />
        ))}
      </div>
    </div>
  );
}
