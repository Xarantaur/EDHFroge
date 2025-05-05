import type { Actions } from './$types';
import { prisma } from '$lib/utils/prisma';
import { fail, redirect } from '@sveltejs/kit';



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
			if (!user || user.password !== password ) {
				return { error: 'Invalid email or password'}
			}

			cookies.set('session', user.email, { path: '/' });
			throw redirect(303, '/profile');
				return { success: true };
	}
};
