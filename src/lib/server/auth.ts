import bcrypt from 'bcrypt';
import crypto from 'crypto'
import { findUserByEmail } from './prisma/userRepo';
import { deleteSessionByToken, findResetPasswordToken, updateUserPassword, createSession } from './prisma/authRepo';


const SALT_ROUNDS = 10;

export async function hashPassword(password: string) {
	return bcrypt.hash(password, SALT_ROUNDS);
}

export async function comparePassword(password: string, hash: string){
	return bcrypt.compare(password, hash);
}

export async function loginUser(email: string, password: string) {
	const user = await findUserByEmail(email)
	if(!user) return null;

	const match = await comparePassword(password, user.password);
	if(!match) return null;

	const token = crypto.randomBytes(32).toString('hex');
	const expires = new Date(Date.now() + 1000 * 60 * 60 * 24);

	await createSession(token, user.id, expires)
		
	return { token, expires };
}

export async function logoutUser(token: string) {
	await deleteSessionByToken(token)
}

export function validatePassword(password: string) {
	if (password.length < 8) {
		return 'Password needs to be at least 8 characters long.'
	}
	if(!/[0-9]/.test(password)) {
		return 'Password skal indeholde mindst ét tal'
	}

	return null
}

export async function findPasswordToken(token: string) {
	return findResetPasswordToken(token)
}

export async function resetPassword(userId: string, newPassword: string) {
	const hashed = await hashPassword(newPassword)
	await updateUserPassword(userId, hashed)
}
