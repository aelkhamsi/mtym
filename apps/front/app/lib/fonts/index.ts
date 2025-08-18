import localFont from "next/font/local";
import { Inter } from "next/font/google";

export const sfPro = localFont({
  src: "./SF-Pro-Display-Medium.otf",
  variable: "--font-sf",
});

export const pally = localFont({
  src: "./SF-Pro-Display-Medium.otf",
  variable: "--font-pally",
})

export const neco = localFont({
  src: "./Neco-Variable.ttf",
  variable: "--font-neco",
})

export const poppins = localFont({
  src: "./Poppins-Variable.ttf",
  variable: "--font-poppins",
})

export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});
