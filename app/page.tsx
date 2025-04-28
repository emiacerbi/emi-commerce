import { HydrationBoundary, dehydrate } from "@tanstack/react-query"
import { QueryClient } from "@tanstack/react-query"
import { getServerSession } from "next-auth"

import ClientProducts from "@/components/ClientProducts"
import { PRODUCTS_PER_PAGE } from "@/constants"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/prisma"

export default async function Home() {
  const session = await getServerSession(authOptions)

  const favorites = await prisma.favorite.findMany({
    where: { User: { email: session?.user?.email || "" } },
  })

  const queryClient = new QueryClient()

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["products"],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/products?page=${pageParam}&limit=${PRODUCTS_PER_PAGE}`,
        { cache: "no-store" }
      )
      if (!res.ok) {
        throw new Error("Failed to fetch products")
      }
      return res.json()
    },
    initialPageParam: 1,
  })

  const dehydratedState = dehydrate(queryClient)

  return (
    <div className="py-8">
      <HydrationBoundary state={dehydratedState}>
        <ClientProducts favorites={favorites} />
      </HydrationBoundary>
    </div>
  )
}
