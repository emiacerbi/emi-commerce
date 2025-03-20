"use client"

import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";

export default function AuthButton({ session } : {session: Session | null}) {

  return (
    <div className="flex gap-4 ml-auto">
      {session ? (
        <>
          <p>Welcome, {session.user?.name}</p>
          <button onClick={() => signOut()}>Sign out</button>
        </>
      ) : (
        <button onClick={() => signIn("google")}>Sign in with Google</button>
      )}
    </div>
  );
}
