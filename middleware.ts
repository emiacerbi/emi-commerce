// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { getServerSession } from "next-auth";

// import { prisma } from "@/prisma";

// import { authOptions } from "./app/api/auth/[...nextauth]/route";

// export async function middleware(req: NextRequest) {
//   const session = await getServerSession(authOptions, req);

//   if (!session || !session.user?.email) {
//     return NextResponse.redirect(new URL("/", req.url));
//   }

//   const store = await prisma.store.findFirst({
//     where: { owner: { email: session.user.email } },
//   });

//   if (!store) {
//     return NextResponse.redirect(new URL("/", req.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: "/dashboard/:path*",
// };
