import { hashSync, compareSync, genSaltSync } from 'bcrypt';

export function hashPassword(password) {
  const salt = genSaltSync();
  return hashSync(password, salt);
}

export function comparePasswords(password, hash) {
  return compareSync(password, hash);
}
