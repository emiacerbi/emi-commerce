import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json([], { status: 200 });

  const store = await prisma.store.findFirst({
    where: { owner: { email: session.user.email } }
  });
  if (!store) return NextResponse.json([], { status: 200 });

  const categories = await prisma.category.findMany({
    where: { storeId: store.id },
    orderBy: { name: "asc" }
  });

  return NextResponse.json(categories);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { name } = await req.json();
  if (!name) return NextResponse.json({ error: "Name required" }, { status: 400 });

  const store = await prisma.store.findFirst({ where: { owner: { email: session.user.email } } });
  if (!store) return NextResponse.json({ error: "Store not found" }, { status: 404 });

  const category = await prisma.category.create({
    data: { name, storeId: store.id }
  });
  return NextResponse.json(category, { status: 201 });
}
