import Link from "next/link";

import { prisma } from "@/prisma";

export async function Categories({ storeId }: { storeId: string | undefined }) {
  const categories = await prisma.category.findMany({
    where: { storeId },
    orderBy: { name: "asc" },
    include: { products: true }
  });

  if (categories.length === 0) {
    return null
  } 

  return (
    <div className="container flex gap-4 py-2 text-sm h-16 items-center">
      <ul className="flex gap-4">
        {categories.map((category) => (
          <li className="text-gray-700" key={category.id}>
            <Link href={`/categories/${category.name}`} >
              {category.name[0].toUpperCase() + category.name.slice(1)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}