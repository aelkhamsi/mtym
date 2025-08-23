import ApiMethods from "./ApiMethods";

export const generateAccessCode = (teamId: number) => {
  const url = `teams-access-code/${teamId}`;
  return ApiMethods.get(url);
}

export const checkAccessCode = (accessCode: string, teamId: number) => {
  const url = `teams-access-code/${teamId}`;
  const body = { accessCode };
  return ApiMethods.post(url, body);
}

export const deleteAccessCode = (id: number) => {
  const url = `teams-access-code/${id}`;
  return ApiMethods.delete(url);
}

export const cleanOldAccessCodes = () => {
  const url = 'teams-access-code/clean'
  return ApiMethods.delete(url);
}
