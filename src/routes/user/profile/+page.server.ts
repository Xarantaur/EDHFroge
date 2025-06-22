import type { PageServerLoad, Actions } from './$types'
import { findUserById } from '$lib/server/prisma/userRepo';
import { redirect, fail } from '@sveltejs/kit'
import { hashPassword, validatePassword } from '$lib/server/auth';
import { updateUserPassword } from '$lib/server/prisma/authRepo';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		throw redirect(303, '/user/login');
	}
	
	const user = await findUserById( locals.user.id)
	return { user }
};

export const actions: Actions = {
	default: async({ request, locals }) => {
		const form = await request.formData();
		const password = form.get('newPassword')?.toString()
		const confirm = form.get('confirm')?.toString()

		if (!password || !confirm) {
			return fail(400, { error: 'All fields are required.' });

		}
		if(password !== confirm){
			return fail(400, {error: 'Password do not match.'});
		}
		
		const error = validatePassword(password)
		if(error) { return fail(400, { error})}

		const hashed = await hashPassword(password);

		await updateUserPassword(locals.user.id, hashed)
		
		return { success: true };
	}
};