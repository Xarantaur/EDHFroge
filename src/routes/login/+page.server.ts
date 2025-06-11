import type { Actions, PageServerLoad  } from './$types';
import { prisma } from '$lib/server/prisma';
import { redirect } from '@sveltejs/kit';
import crypto from 'crypto'
import { loginUser } from '$lib/server/auth';


export const load: PageServerLoad = ({ cookies }) => {
	if(cookies.get('session')) {
		throw redirect(303, '/');
	}
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const form = await request.formData();
		const email = form.get('email')?.toString().trim().toLowerCase();
		const password = form.get('password')?.toString();

		if (!email || !password) {
			return { error: 'All fields are required.' };
		}
		
		const session = await loginUser(email, password);
		if(!session) {
			return { error: 'invalid email or password' };
		}

		

			cookies.set('session', session.token, { 
				path: '/', 
				sameSite: 'lax', 
				secure: true,
				expires: session.expires
			 });
			throw redirect(303, '/');
	}
};
