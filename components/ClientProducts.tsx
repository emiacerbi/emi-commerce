"use client"

import { Product as ProductType, Favorite as FavoriteType } from "@prisma/client"
import { useInfiniteQuery } from "@tanstack/react-query"

import Grid from "@/components/Grid"
import Product from "@/components/Product"
import { PRODUCTS_PER_PAGE } from "@/constants"

interface ClientProductsProps {
  favorites: FavoriteType[]
}

export default function ClientProducts({ favorites }: ClientProductsProps) {

  const fetchProducts = async ({ pageParam = 1 }) => {
    const res = await fetch(`/api/products?page=${pageParam}&limit=${PRODUCTS_PER_PAGE}`)
    if (!res.ok) {
      throw new Error("Error fetching products")
    }
    return res.json()
  }

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetched,
  } = useInfiniteQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.hasMore) {
        return allPages.length + 1
      }
      return undefined
    },
    initialPageParam: 1,
  })

  return (
    <div className="flex flex-col gap-4 mt-8">
      {/* Products */}
      {isFetched && (
        <Grid>
          {data?.pages.map((page, pageIndex) => (
            <div key={pageIndex} className="contents">
              {page.products.map((product: ProductType) => {
                const safeProduct = { ...product, price: parseFloat(product.price.toString()) } 
                return (
                  <Product
                    key={safeProduct.id}
                    id={safeProduct.id}
                    name={safeProduct.name}
                    description={safeProduct.description}
                    stock={safeProduct.stock}
                    image={safeProduct.image}
                    price={safeProduct.price}
                    favorites={favorites} 
                  />
                )
              })}
            </div>
          ))}
        </Grid>
      )}

      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className="p-2 bg-blue-500 text-white rounded mx-auto"
        >
          {isFetchingNextPage ? "Cargando..." : "Cargar más"}
        </button>
      )}
    </div>
  )
}
