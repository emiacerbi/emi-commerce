import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { PRODUCTS_PER_PAGE } from "@/constants";
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

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const page = parseInt(searchParams.get("page") || "1")
  const limit = parseInt(searchParams.get("limit") || PRODUCTS_PER_PAGE)

  const skip = (page - 1) * limit

  const products = await prisma.product.findMany({
    skip,
    take: limit,
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json({
    products: products,
    hasMore: products.length === limit,
  })
}

