import { getServerSession } from "next-auth";

import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function DashboardLayout({ children }: {children: React.ReactNode}) {
  const session = await getServerSession(authOptions);
  return (
    <div className="">
      <header>
        {session?.user?.name}
      </header>
      {children}
    </div>
  ) 
}
