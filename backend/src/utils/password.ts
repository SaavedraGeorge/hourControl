import bcrypt from 'bcryptjs';

/**
 * Number of salt rounds for bcrypt. 10 is a good default that balances security
 * and performance on modern hardware. Adjust if you need stronger hashing.
 */
const SALT_ROUNDS = 10;

/**
 * Hash a plaintext password.
 * @param plainPassword The password provided by the user.
 * @returns The bcrypt hash.
 */
export async function hashPassword(plainPassword: string): Promise<string> {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return bcrypt.hash(plainPassword, salt);
}

/**
 * Compare a plaintext password with a stored bcrypt hash.
 * @param plainPassword The password supplied during login.
 * @param hash The stored hash from the database.
 * @returns `true` if they match, otherwise `false`.
 */
export async function comparePassword(
  plainPassword: string,
  hash: string,
): Promise<boolean> {
  return bcrypt.compare(plainPassword, hash);
}
