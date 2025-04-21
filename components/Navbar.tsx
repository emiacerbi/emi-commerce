import Link from "next/link";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/prisma";

import AuthButton from "./AuthButton";

export default async function Navbar() {

  const session = await getServerSession(authOptions);

  const store = await prisma.store.findFirst({
    where: { owner: { email: session?.user?.email || "" } },
  });

  return (
    <div className="border-b border-gray-300">
      <nav className="flex gap-4 py-2 text-sm max-w-[1180px] mx-auto">
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
          <Link href='/cart'>
            Cart
          </Link>
        </div>
        <AuthButton session={session} />
      </nav>
    </div>
  )
}	