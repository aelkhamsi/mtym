import ApiMethods from "./ApiMethods";

export const getAdminUserById = (id: number, cookie?: string) => {
  const url = `/admin/${id}`;
  return ApiMethods.get(url, {cookie});
}

export const updateAdmin = async (id: number, partialAdmin: any, cookie?: string) => {
  const url = `/admin/${id}`;
  const body = {...partialAdmin};
  return ApiMethods.put(url, {body, cookie});
}