import Grid from "@/components/Grid"
import Product from "@/components/Product"
import { prisma } from "@/prisma"

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const filteredProducts = await prisma.product.findMany({
    where: { category: { name: slug } },
  })

  console.log("Filtered Products:", filteredProducts)

  return <Grid>
    {filteredProducts.map((product) => (
      <Product
        key={product.id}
        id={product.id}
        name={product.name}
        description={product.description}
        price={product.price.toNumber()}
        image={product.image}
        stock={product.stock}
      />
    ))}
  </Grid>
}