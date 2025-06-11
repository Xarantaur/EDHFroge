import type { Actions } from './$types';
import { prisma } from '$lib/server/prisma';
import { fail } from '@sveltejs/kit';
import crypto from 'crypto';



export const actions: Actions = {
    default: async ({ request }) => {
        const form = await request.formData();
        const email = form.get('email')?.toString().trim().toLowerCase()

        if (!email) {
			return fail(400, { error: 'Email is required.' });
		}
        

        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (user) {
			const token = crypto.randomBytes(32).toString('hex');
			const expires = new Date(Date.now() + 1000 * 60 * 15); // 15 minutes

			await prisma.passwordReset.create({
				data: {
					userId: user.id,
					token,
					expiresAt: expires
				}
			});

			console.log(`Reset link: http://localhost:5173/reset-password?token=${token}`);
		}
           
        return { success: 'If that email is registered, a reset link has been sent.' };
    }
};
