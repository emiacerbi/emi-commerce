import Link from "next/link";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/prisma";

import AuthButton from "./AuthButton";
import { Categories } from "./Categories";
import Logo from "./Icons/Logo";

export default async function Navbar() {

  const session = await getServerSession(authOptions);

  const store = await prisma.store.findFirst({
    where: { owner: { email: session?.user?.email || "" } },
  });

  return (
    <div className="border-b sticky z-50 bg-white top-0 border-gray-300">
      <nav className="flex gap-4 py-2 text-sm h-16 items-center max-w-[1180px] mx-auto">
        <Logo />  
        <div className="gap-4 flex">
          <Link href='/' className="hover:text-gray-500">
            Home
          </Link>
          {!!store && (
            <Link href='/dashboard' className="hover:text-gray-500">
              Admin panel
            </Link>
          )}
          {!!session && (
            <Link href='/favorites' className="hover:text-gray-500">
              Favorites
            </Link>
          )}
          <Link href='/cart' className="hover:text-gray-500">
            Cart
          </Link>
        </div>
        <AuthButton session={session} />
      </nav>

      <div className="flex gap-4 py-2 text-sm h-16 items-center max-w-[1180px] mx-auto">
        <Categories storeId={store?.id} />
      </div>
    </div>
  )
}	