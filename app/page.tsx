import Product from "@/components/Product";
import { prisma } from "@/prisma";

export default async function Home() {
  const products = await prisma.product.findMany();

  return (
    <div className="grid grid-cols-3 mt-4">  
      {products.map(product => (
        <Product 
          key={product.id}
          id={product.id}
          name={product.name} 
          description={product.description} 
          stock={product.stock} 
          image={product.image}
        />
      ))}
    </div>
  );
}
