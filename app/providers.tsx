"use client";

import { SessionProvider } from "next-auth/react";
import { ReactChildren } from "./types";

export const NextAuthProvider = ({ children }: ReactChildren) => {
  return <SessionProvider>{children}</SessionProvider>;
};
