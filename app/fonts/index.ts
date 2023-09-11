import localFont from "next/font/local";
import { Inter } from "next/font/google";

export const sfPro = localFont({
  src: "./SF-Pro-Display-Medium.otf",
  variable: "--font-sf",
});

export const raleway = localFont({
    src: "./Raleway-VariableFont_wght.ttf",
    variable: "--font-raleway",
});

export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});
