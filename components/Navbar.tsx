import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import AuthButton from "./AuthButton";

export default async function Navbar() {

  const session = await getServerSession(authOptions);
  return (
    <nav className="flex gap-4 py-2 border-b border-b-gray-500">
      <p>
        11 1111-1111
      </p>
      <p>
        emi-commerce@gmail.com
      </p>
      <AuthButton session={session} />
    </nav>
  )
}	