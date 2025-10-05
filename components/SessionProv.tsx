"use client";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { SnackbarProvider } from "notistack";

type SessionProvProps = {
  children: ReactNode;
};

export default function SessionProv({ children }: SessionProvProps) {
  return (
    <SessionProvider>
      <SnackbarProvider
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        {children}
      </SnackbarProvider>
    </SessionProvider>
  );
}
