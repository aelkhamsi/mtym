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
  /* Normalized the same way the API stores it, so the availability check asks
   * about the value that will actually be saved */
  const url = `/teams/quadrigram/${encodeURIComponent(quadrigram?.trim()?.toUpperCase() ?? '')}`;
  return ApiMethods.get(url)
}

export const createTeam = (team: any) => {
  const url = '/teams';
  const body = {...team};
  return ApiMethods.post(url, {body});
}

/* Admin-side creation: members and leader are chosen explicitly instead of
 * being derived from the session, so they travel in the body. */
export const createTeamAsAdmin = (team: {
  name: string,
  slogan: string,
  quadrigram: string,
  memberIds: number[],
  leaderId: number,
}) => {
  const url = '/teams/admin';
  const body = {...team};
  return ApiMethods.post(url, {body});
}

export const updateTeam = (teamId: number, partialTeam: any) => {
  const url = `/teams/${teamId}`;
  const body = {...partialTeam};
  return ApiMethods.put(url, {body});
}

export const updateIntermediateReport = (
  teamId: number,
  problemNumber: number,
  fileUrl: string,
) => {
  const url = `/teams/${teamId}/intermediate-reports/${problemNumber}`;
  return ApiMethods.put(url, { body: { fileUrl } });
}

export const getIntermediateReportUploadUrl = (
  teamId: number,
  problemNumber: number,
  size: number,
  checksum: string,
) => {
  const url = `/teams/${teamId}/intermediate-reports/${problemNumber}/signed-url`;
  return ApiMethods.post(url, { body: { size, checksum } });
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

export const markFreeAgent = (userId: number) => {
  const url = `/teams/free-agent/${userId}`;
  return ApiMethods.put(url);
}

export const getTeamHistoryForUser = (userId: number) => {
  const url = `/teams/history/user/${userId}`;
  return ApiMethods.get(url);
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