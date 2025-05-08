import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/prisma";

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const store = await prisma.store.findFirst({
    where: { owner: { email: session.user.email } },
  });

  if (!store) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  
  const category = await prisma.category.findUnique({
    where: { id, storeId: store.id },
  });
  
  if (!category) {
    return NextResponse.json(
      { error: "Category not found or does not belong to your store" },
      { status: 404 }
    );
  }

  const deletedCategory = await prisma.category.delete({ where: { id } });
  return NextResponse.json(deletedCategory);
}