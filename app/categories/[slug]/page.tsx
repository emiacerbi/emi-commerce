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

  return (
    <div className="py-8">
      {filteredProducts.length === 0 && (
        <p className="text-center font-semibold">
          Aún no hay productos en esta categoria
        </p>
      )}
      <Grid>
        {filteredProducts.map((product) => (
          <Product
            key={product.id}
            {...product}
            price={product.price.toNumber()}
          />
        ))}
      </Grid>
    </div>
  )
}