import type { Actions, PageServerLoad  } from './$types';
import { prisma } from '$lib/utils/prisma';
import { redirect } from '@sveltejs/kit';
import { comparePassword } from '$lib/server/auth';
import crypto from 'crypto'


export const load: PageServerLoad = ({ cookies }) => {
	const session = cookies.get('session');
	if (session) {
		throw redirect(303, '/profile');
	}
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const form = await request.formData();
		const email = form.get('email')?.toString();
		const password = form.get('password')?.toString();

		if (!email || !password) {
			return { error: 'All fields are required.' };
		}

		const user = await prisma.user.findUnique({
			where: { email },
		});
			if (!user ) {
				return { error: 'Invalid email or password'}
			}


			const match = await comparePassword(password, user.password);
			if(!match) {
				return { error: 'Invalid email or password'}
			}

			const token = crypto.randomBytes(32).toString('hex');
			const expires = new Date(Date.now() + 1000 * 60 * 60 * 24);

			await prisma.session.create({
				data: {
					token,
					userId: user.id,
					expiresAt: expires
				}
			})

			cookies.set('session', token, { path: '/', sameSite: 'lax', secure: true });
			throw redirect(303, '/profile');
	}
};
