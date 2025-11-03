import ApiMethods from "./ApiMethods";

export const postParticipantDetails = (participantDetails: any) => {
  const url = '/participant-details';
  const body = {...participantDetails};
  return ApiMethods.post(url, {body});
}

export const putParticipantDetails = (id: number, partialParticipantDetails: any) => {
  const url = `/participant-details/${id}`;
  const body = {...partialParticipantDetails};
  return ApiMethods.put(url, {body});
}

export const deleteParticipantDetails = (id: number) => {
  const url = `/participant-details/${id}`;
  return ApiMethods.delete(url);
}