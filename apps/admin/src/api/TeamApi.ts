import ApiMethods from "./ApiMethods";

export const getAllTeams = (cookie?: string) => {
  const url = '/teams';
  return ApiMethods.get(url, {cookie});
}

export const getTeamById = (teamId: number, cookie?: string) => {
  const url = `/teams/id/${teamId}`;
  return ApiMethods.get(url, {cookie});
}

export const getTeamByQuadrigram = (quadrigram: string) => {
  const url = `/teams/quadrigram/${quadrigram}`;
  return ApiMethods.get(url)
}

export const createTeam = (team: any) => {
  const url = '/teams';
  const body = {...team};
  return ApiMethods.post(url, {body});
}

export const updateTeam = (teamId: number, partialTeam: any) => {
  const url = `/teams/${teamId}`;
  const body = {...partialTeam};
  return ApiMethods.put(url, {body});
}

export const addUser = (teamId: number) => {
  const url = `/teams/join/${teamId}`;
  return ApiMethods.put(url);
}

export const removeUser = (teamId: number, userId?: number) => {
  const url = `/teams/unjoin/${teamId}`;
  const body = userId ? { userId } : {};
  return ApiMethods.put(url, {body});
}

export const changeLeader = (teamId: number, newLeaderId: number) => {
  const url = `/teams/change-leader/${teamId}`;
  const body = {
    newLeaderId
  }
  return ApiMethods.put(url, {body});
}

export const deleteTeam = (teamId: number) => {
  const url = `/teams/${teamId}`;
  return ApiMethods.delete(url);
}