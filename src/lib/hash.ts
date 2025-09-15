import bcrypt from "bcrypt"

// Jumlah salt rounds (standar 10)
const SALT_ROUNDS = 10

/**
 * Hash password
 * @param password string
 * @returns Promise<string>
 */
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, SALT_ROUNDS)
}

/**
 * Compare password dengan hash
 * @param password string
 * @param hash string
 * @returns Promise<boolean>
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash)
}
