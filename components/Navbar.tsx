import Link from "next/link";
import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/prisma";

import AuthButton from "./AuthButton";

export default async function Navbar() {

  const session = await getServerSession(authOptions);

  const store = await prisma.store.findFirst({
    where: { owner: { email: session?.user?.email || "" } },
  });

  return (
    <nav className="flex gap-4 py-2 border-b border-b-gray-500">
      <p>
        11 1111-1111
      </p>
      <p>
        emi-commerce@gmail.com
      </p>
      <div className="mx-auto gap-4 flex">
        <Link href='/'>
          Home
        </Link>
        {!!store && (
          <Link href='/dashboard'>
            Admin panel
          </Link>
        )}
        {!!session && (
          <Link href='/favorites'>
            Favorites
          </Link>
        )}
      </div>
      <AuthButton session={session} />
    </nav>
  )
}	