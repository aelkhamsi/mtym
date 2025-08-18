import {default as c } from "crypto"

// TOKEN

export const getToken = () => {
  return localStorage.getItem('access_token');
}

export function getUserDataFromToken(token: string | undefined) {
  try {
    return token
      ? JSON.parse(atob(token?.split('.')[1]))
      : undefined
  } catch(_) {
    return undefined
  }
}

export const checkToken = (token: string) => {
  const { exp } = getUserDataFromToken(token);
  return parseInt(exp) > (new Date().getTime() + 1) / 1000;
}

// FORMS

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

export const sanitizeApplication = (application: any) => {
  const newObject = {} as any;
  Object.keys(application).forEach((key) => {
    newObject[key] = (key === 'dateOfBirth')
      ? new Date(application[key])
      : key === 'activityChoices' || key === 'standMembers'
        ? JSON.parse(application[key])
        : application[key]===null ? "" : application[key]
  });
  return newObject;
}
