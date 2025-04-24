import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/prisma";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name, description, price, image, categoryId, storeId } = await req.json();

  const store = await prisma.store.findUnique({ 
    where: { id: storeId }, 
    include: { owner: true } 
  });

  if (!store || store.owner.email !== session.user?.email) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const product = await prisma.product.create({
    data: { name, description, price, image, categoryId, storeId },
  });

  return NextResponse.json(product, { status: 201 });
}

