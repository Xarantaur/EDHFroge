import type { PageServerLoad, Actions } from './$types'
import { prisma } from '$lib/server/prisma'
import { redirect, fail } from '@sveltejs/kit'
import { hashPassword } from '$lib/server/auth';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		throw redirect(303, '/login');
	}
	
	const user = await prisma.user.findUnique({
		where: { id: locals.user.id },
		select: {
			id: true,
			email: true,
			decks: true,
			createdAt: true, 
		}
	});

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
		// implement password requirements
		const hashed = await hashPassword(password);

		await prisma.user.update({
			where: {id: locals.user!.id },
			data: { password: hashed }
		});
		
		return { success: true };
	}
};