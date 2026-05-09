import {default as c } from "crypto"

export const computeSHA256 = async (file: File) => {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}

export const generateFileName = (bytes = 6) => c.randomBytes(bytes).toString("hex")

export const getUploadFolderName = (firstName: string|undefined, lastName: string|undefined) => {
  if (!firstName || !lastName) return ''
  return firstName?.toLowerCase().replace(' ', '') + '_' + lastName?.toLowerCase().replace(' ', '');
}