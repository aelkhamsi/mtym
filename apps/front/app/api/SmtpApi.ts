import ApiMethods from "./ApiMethods";

export const sendCustomEmail = (email: string, subject: string, content: string) => {
  const url = '/email';
  const body = {email, subject, content};
  return ApiMethods.post(url, {body});
}