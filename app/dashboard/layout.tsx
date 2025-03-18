import { getServerSession } from "next-auth";

import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function DashboardLayout({ children }: {children: React.ReactNode}) {
  const session = await getServerSession(authOptions);
  return (
    <div className="container mx-auto border-blue-500 border-2 min-h-screen flex items-center justify-center">
      <header>
        {session?.user?.name}
      </header>
      {children}
    </div>
  ) 
}
