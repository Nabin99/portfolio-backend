import bcrypt from "bcrypt";

export const encrypt = (password: string) => {
  return bcrypt.hash(password, 10);
};

export const validateEncryption = (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};
