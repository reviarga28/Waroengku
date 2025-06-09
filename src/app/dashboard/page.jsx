"use client";
import { useSession } from "next-auth/react";
import React from "react";

export default function DashboardPage() {
  const { data: session } = useSession();
  if (!session) {
    return (
      <div>
        <p>Not signed in</p>
        <button onClick={() => signIn()}>Sign in</button>
      </div>
    );
  }
  return (
    <div>
      <p>Welcome, {session.user.name}</p>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
}
