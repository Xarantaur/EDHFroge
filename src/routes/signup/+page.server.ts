import type { Actions } from './$types';
import { prisma } from '$lib/utils/prisma'
import bcrypt from 'bcrypt'

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const form = await request.formData();
		const email = form.get('email')?.toString();
		const password = form.get('password')?.toString();
		const confirm = form.get('confirm')?.toString();

		if (!email || !password || !confirm) {
			return { error: 'All fields are required.' };
		}

		if (password !== confirm) {
			return { error: 'Passwords do not match.' };
		}

		const existingUser = await prisma.user.findUnique({
			where: { email }
		});

		if (existingUser) {
			return { error: 'User Already exists.'}
		}
		const hashedPassword = await bcrypt.hash(password, 10);

		
		const newUser = await prisma.user.create({
			data: {
				email,
				password: hashedPassword

			}}
		)

		cookies.set('session', newUser.email, { path: '/' })
		return { success: true };
	}
	
};
