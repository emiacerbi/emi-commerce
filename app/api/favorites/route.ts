import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { prisma } from "@/prisma";

import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { productId } = await req.json()

  const user = await prisma.user.findUnique({ 
    where: { email: session.user.email }, 
  });

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const duplicate = await prisma.favorite.findUnique({
    where: { userId_productId: { userId: user.id, productId: productId } },
  });
  

  if (duplicate) {
    const removeDuplicate = await prisma.favorite.delete({
      where: { userId_productId: { userId: user.id, productId: productId } } }
    )
    return NextResponse.json({ removeDuplicate }, { status: 200 });
  }
  
  const favorite = await prisma.favorite.create({
    data: { productId, userId: user.id },
  });

  return NextResponse.json({ favorite }, { status: 201 })
}