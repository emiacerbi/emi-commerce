import Link from "next/link";

import { prisma } from "@/prisma";

export async function Categories({ storeId }: { storeId: string | undefined }) {
  const categories = await prisma.category.findMany({
    where: { storeId },
    orderBy: { name: "asc" },
  });

  return (
    <div>
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