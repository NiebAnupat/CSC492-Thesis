import { hash } from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 13;
  return hash(password, saltRounds);
};
