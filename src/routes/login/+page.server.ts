import type { Actions, PageServerLoad  } from './$types';
import { prisma } from '$lib/utils/prisma';
import { redirect } from '@sveltejs/kit';
import bcrypt from 'bcrypt'


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

			const passwordMatches = await bcrypt.compare(password, user.password);
			if(!passwordMatches) {
				return { error: 'Invalid email or password'}
			}

			cookies.set('session', user.id, { path: '/' });
			throw redirect(303, '/profile');
				return { success: true };
	}
};
