import type { Actions } from './$types';
import { CreateResetPasswordToken } from '$lib/server/prisma/authRepo';
import { fail } from '@sveltejs/kit';
import crypto from 'crypto';
import { sendResetEmail } from '$lib/server/email';
import { findUserByEmail } from '$lib/server/prisma/userRepo';



export const actions: Actions = {
    default: async ({ request }) => {
        const form = await request.formData();
        const email = form.get('email')?.toString().trim().toLowerCase()

        if (!email) {
			return fail(400, { error: 'Email is required.' });
		}
        
        const user = await findUserByEmail(email)

        if (user) {
			const token = crypto.randomBytes(32).toString('hex');
			const expires = new Date(Date.now() + 1000 * 60 * 15); // 15 minutes

			await CreateResetPasswordToken(user.id, token, expires)

			await sendResetEmail(user.email, token)
			console.log(`Reset link: http://localhost:5173/user/reset-password?token=${token}`);
			
		}
           
        return { success: 'If that email is registered, a reset link has been sent.' };
    }
};
