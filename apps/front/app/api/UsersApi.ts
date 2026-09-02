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

/* Backs the admin "create team" member picker: the API already restricts the
 * list to validated applicants who are either stuck on an INCOMPLETE team or
 * marked as a free agent. */
export const getEligibleUsersForTeamCreation = async (cookie?: string) => {
  const url = `/users/eligible-for-team`;
  return ApiMethods.get(url, {cookie});
}

export const getUserById = async (id: number, cookie?: string) => {
  const url = `/users/${id}`;
  return ApiMethods.get(url, {cookie});
}

export const updateUser = async (id: number, partialUser: any, token?: string) => {
  const url = `/users/${id}`;
  const body = {...partialUser};
  return ApiMethods.put(url, {body, token});
}
