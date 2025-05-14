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
    <div className="container flex gap-4 justify-center items-center">
      <ul className="flex gap-4">
        {categories.map((category) => (
          <Link 
            key={category.id} 
            href={`/categories/${category.name}`} 
          >
            <li className="text-gray-700 bg-blue-300 py-2 px-3 rounded-md" >
              {category.name[0].toUpperCase() + category.name.slice(1)}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  )
}