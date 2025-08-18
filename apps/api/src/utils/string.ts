export const cleanString = (str: string) => {
  return str
    .replace(/[\s~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=-]/g, '')
    .toLowerCase();
};
