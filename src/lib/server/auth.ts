import bcrypt from 'bcrypt';
import { prisma } from '$lib/utils/prisma'
import crypto from 'crypto'

const SALT_ROUNDS = 10;

export async function hashPassword(password: string) {
	return bcrypt.hash(password, SALT_ROUNDS);
}

export async function comparePassword(password: string, hash: string){
	return bcrypt.compare(password, hash);
}

export async function loginUser(email: string, password: string) {
	const user = await prisma.user.findUnique({where: { email } });
	if(!user) return null;

	const match = await comparePassword(password, user.password);
	if(!match) return null;

	const token = crypto.randomBytes(32).toString('hex');
	const expires = new Date(Date.now() + 1000 * 60 * 60 * 24);

	await prisma.session.create({
		data: {
			token,
			userId: user.id,
			expiresAt: expires
		}
	})

	return { token, expires };
}
