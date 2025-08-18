import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { default as c } from "crypto";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(input: string | number): string {
  const date = new Date(input)
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export const computeSHA256 = async (file: File) => {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}

export const getUploadFolderName = (firstName: string, lastName: string) => {
  return firstName.toLowerCase().replace(' ', '') + '_' + lastName.toLowerCase().replace(' ', '');
}

export const generateFileName = (bytes = 6) => c.randomBytes(bytes).toString("hex")

export const objectMap = (obj: any, fn: any) => {
  const newObject = {} as any;
  Object.keys(obj).forEach((key) => {
    newObject[key] = fn(obj[key]);
  });
  return newObject;
}

export const objIsEmpty = (obj: any) => Object.keys(obj).length === 0 && obj.constructor === Object;

/*
 TOKEN
 */

export const getToken = () => {
  return localStorage.getItem('access_token');
}

export const getUserDataFromToken = (token: string | undefined) => {
  try {
    return token
      ? JSON.parse(atob(token?.split('.')[1]))
      : undefined
  } catch(_) {
    return undefined
  }
}

export const checkToken = (token: string) => {
  const { exp, role } = getUserDataFromToken(token);
  const isExpired = parseInt(exp) <= (new Date().getTime() + 1) / 1000;
  return role === 'admin' && !isExpired;
}
