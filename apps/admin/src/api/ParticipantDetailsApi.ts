import ApiMethods from "./ApiMethods";

export const getAllParticipantDetails = (cookie?: string) => {
  const url = '/participant-details';
  return ApiMethods.get(url, {cookie});
}