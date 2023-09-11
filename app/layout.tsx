import "./globals.css";
import styles from "./base.module.css";
import cx from "classnames";
import { Analytics } from "@vercel/analytics/react";
import { sfPro, inter, raleway } from "./fonts";
import Nav from "@/components/layout/nav";
import Footer from "@/components/layout/footer";
import { Suspense } from "react";
import { NextAuthProvider } from "./providers";

export const metadata = {
  title: "Trin.bbq",
  description:
    "Trin.bbq é um web app desenvolvido em Next.js para gerenciar churrascos.",
  themeColor: "#FFF",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cx(sfPro.variable, inter.variable, raleway.variable)}>
        <div className={cx("fixed h-screen w-full ", styles.background)} />
        <Suspense fallback="...">
          {/* @ts-expect-error Server Component */}
          <Nav />
        </Suspense>
        <main className="flex min-h-screen w-full flex-col items-center justify-center py-32">
          <NextAuthProvider>{children}</NextAuthProvider>
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
