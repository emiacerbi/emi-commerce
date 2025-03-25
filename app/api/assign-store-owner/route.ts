import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/prisma";

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const secretKey = process.env.ADMIN_SECRET_KEY;

  if (!authHeader || authHeader !== `Bearer ${secretKey}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { email, storeName } = await req.json();

  if (!email || !storeName) {
    return NextResponse.json({ error: "Email and store name are required" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const existingStore = await prisma.store.findFirst({ where: { ownerId: user.id } });

  if (existingStore) {
    return NextResponse.json({ error: "User already owns a store" }, { status: 400 });
  }

  const store = await prisma.store.create({
    data: {
      name: storeName,
      owner: { connect: { id: user.id } },
    },
  });

  return NextResponse.json({ message: "Store owner assigned", store }, { status: 201 });
}
