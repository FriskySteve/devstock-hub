"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/shared/Button";

export default function SignOutButton() {
  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  return (
    <Button onClick={handleSignOut} variant="fill" size="l" className="w-full">
      Logout
    </Button>
  );
}
