import ApiMethods from "./ApiMethods"

export const getUserData = async () => {
  const url = 'users/informations';
  return ApiMethods.get(url);
}

export const updateUser = async (id: number, partialUser: any, token?: string) => {
  const url = `users/${id}`;
  const body = {...partialUser};
  return ApiMethods.put(url, body, token);
}