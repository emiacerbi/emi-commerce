import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/prisma";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const productId = params.id;
  const { name, description, price, image, stock } = await req.json();

  const store = await prisma.store.findFirst({
    where: { owner: { email: session.user.email } },
  });

  if (!store) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const product = await prisma.product.findUnique({
    where: { id: productId, storeId: store.id },
  });

  if (!product) {
    return NextResponse.json({ error: "Product not found or does not belong to your store" }, { status: 404 });
  }

  const updatedProduct = await prisma.product.update({
    where: { id: productId },
    data: {
      name,
      description,
      price,
      image,
      stock: stock ?? 0, 
    },
  });

  return NextResponse.json(updatedProduct);
}

export async function DELETE(req: NextRequest, { params }: {params: {id: string}}) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const productId = params.id;

  const store = await prisma.store.findFirst({
    where: { owner: { email: session.user.email } },
  });

  if (!store) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const product = await prisma.product.findUnique({
    where: { id: productId, storeId: store.id },
  });

  if (!product) {
    return NextResponse.json({ error: "Product not found or does not belong to your store" }, { status: 404 });
  }

  const deletedProduct = await prisma.product.delete({ where: { id: productId } })

  return NextResponse.json(deletedProduct)
}
