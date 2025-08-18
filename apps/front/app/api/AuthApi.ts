import ApiMethods from "./ApiMethods";


export const logIn = (email: string, password: string) => {
  const url = 'auth/login';
  const body = {
    email,
    password
  }
  return ApiMethods.post(url, body);
}

export const signUp = (firstName: string, lastName: string, email: string, password: string) => {
  const url = 'auth/signup';
  const body = {
    firstName,
    lastName,
    email,
    password
  };
  return ApiMethods.post(url, body);
}

export const resetPassword = (email: string) => {
  const url = 'auth/reset-password';
  const body = {
    email,
  };
  return ApiMethods.post(url, body);
}

export const sendEmailVerificationCode = (email: string) => {
  const url = 'auth/send-email-verification';
  const body = {
    email,
  };
  return ApiMethods.post(url, body);
}

export const checkEmailVerificationCode = (email: string, verificationCode: string) => {
  const url = 'auth/verify-email';
  const body = {
    email,
    verificationCode,
  };
  return ApiMethods.post(url, body);
}