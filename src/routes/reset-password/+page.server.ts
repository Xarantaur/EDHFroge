import type { Actions, PageServerLoad  } from './$types';
import { prisma } from '$lib/server/prisma';
import { hashPassword } from '$lib/server/auth';
import { redirect, fail } from '@sveltejs/kit';


export const load: PageServerLoad = async ({ url }) => {
	const token = url.searchParams.get('token');

	if (!token) {
		throw redirect(303, '/reset-link-invalid'); 
	}

	const reset = await prisma.passwordReset.findUnique({
		where: { token }
	});

	if (!reset || reset.expiresAt < new Date()) {
		throw redirect(303, '/reset-link-expired'); 
	}

	return {
		token
	};
};

export const actions: Actions = {
  default: async ({ request }) => {
    const form = await request.formData();
    const token = form.get('token')?.toString();
    const password = form.get('password')?.toString();
    const confirm = form.get('confirm')?.toString();

    if (!token || !password || !confirm) {
      return fail(400, { error: 'All fields are required.' });
    }

    if (password !== confirm) {
      return fail(400, { error: 'Passwords do not match.' });
    }

    const reset = await prisma.passwordReset.findUnique({
      where: { token }
    });

    if (!reset || reset.expiresAt < new Date()) {
      return fail(400, { error: 'Invalid or expired reset link.' });
    }

    const hashed = await hashPassword(password)

    await prisma.user.update({
      where: { id: reset.userId },
      data: { password: hashed }
    });

    await prisma.passwordReset.delete({
      where: { token }
    });

    throw redirect(303, '/login');
  }
};
