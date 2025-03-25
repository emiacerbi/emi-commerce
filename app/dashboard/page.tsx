import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/prisma";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    redirect("/");
  }

  const store = await prisma.store.findFirst({
    where: { owner: { email: session.user.email } },
  });

  if (!store) {
    redirect("/");
  }

  return (
    <div>
      Welcome to your dashboard!

      Here you can create your products
    </div>
  ) 
}

