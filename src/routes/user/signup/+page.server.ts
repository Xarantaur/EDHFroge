import type { Actions } from './$types';
import { prisma } from '$lib/server/prisma'
import { hashPassword, validatePassword } from '$lib/server/auth';
import crypto from 'crypto'
import { redirect, fail } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const form = await request.formData();
		const email = form.get('email')?.toString().trim().toLowerCase();
		const password = form.get('password')?.toString();
		const confirm = form.get('confirm')?.toString();

		
		
		if (!email || !password || !confirm) {
			return { error: 'All fields are required.' };
		}

		if (password !== confirm) {
			return { error: 'Passwords do not match.' };
		}
		const error = validatePassword(password);
		if(error) { return fail(400, { error})}

		const existingUser = await prisma.user.findUnique({
			where: { email }
		});

		if (existingUser) {
			return { error: 'User Already exists.'}
		}
		const hashed = await hashPassword(password);

		const newUser = await prisma.user.create({
			data: {
				email,
				password: hashed

			}}
		)

		const token = crypto.randomBytes(32).toString('hex');
		const expires = new Date(Date.now() + 1000 * 60 * 60 * 24);

			await prisma.session.create({
			data: {
				token,
				userId: newUser.id,
				expiresAt: expires
			}
		});

		cookies.set('session', token, { 
			path: '/',
			sameSite: 'lax',
			secure: true 
		});

		throw redirect(303, '/user/profile')
	}
	
};
