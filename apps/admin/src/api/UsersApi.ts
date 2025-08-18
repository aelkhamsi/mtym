import ApiMethods from "./ApiMethods";

export const getAllUsers = () => {
  const url = 'users';
  return ApiMethods.get(url);
}

export const getUserById = (id: number) => {
  const url = `users/${id}`;
  return ApiMethods.get(url);
}

export const deleteUserById = (id: number) => {
  const url = `users/${id}`;
  return ApiMethods.delete(url);
}