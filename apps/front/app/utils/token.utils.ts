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