import ApiMethods from "./ApiMethods"

export const getSessionCookie = async (cookie?: string) => {
  const url = '/users/me';
  return ApiMethods.get(url, {
    cookie, 
    params: cookie ? {cache: "no-store"} : {}
  });
}

export const getAllUsers = async (cookie?: string) => {
  const url = `/users`;
  return ApiMethods.get(url, {cookie});
}

export const getUserById = async (id: number, cookie?: string) => {
  const url = `/users/${id}`;
  return ApiMethods.get(url, {cookie});
}

export const updateUser = async (id: number, partialUser: any, cookie?: string) => {
  const url = `/users/${id}`;
  const body = {...partialUser};
  return ApiMethods.put(url, {body, cookie, params: cookie ? {cache: "no-store"} : {}});
}
