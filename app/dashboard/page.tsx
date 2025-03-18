import { getServerSession } from "next-auth";

import AuthButton from "@/components/AuthButton";

import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div>
        <p>You must be logged in to view this page.</p>
        <AuthButton />
      </div>
    ) 
  }

  return (
    <div>
    </div>
  ) 
}
