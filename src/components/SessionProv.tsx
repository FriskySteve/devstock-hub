"use client";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

type SessionProvProps = {
  children: ReactNode;
};

export default function SessionProv({ children }: SessionProvProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
