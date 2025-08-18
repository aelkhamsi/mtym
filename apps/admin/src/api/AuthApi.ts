import ApiMethods from "./ApiMethods";


export const logIn = (username: string, password: string) => {
  const url = 'auth/login/admin';
  const body = {
    username,
    password
  }
  return ApiMethods.post(url, body);
}

export const signUp = (username: string, password: string) => {
  const url = 'auth/signup/admin';
  const body = {
    username,
    password
  };
  return ApiMethods.post(url, body);
}