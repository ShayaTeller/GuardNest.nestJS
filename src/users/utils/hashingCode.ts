import * as bcrypt from 'bcrypt';

export async function hashPassword(password: string): Promise<string> {
    const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
}
