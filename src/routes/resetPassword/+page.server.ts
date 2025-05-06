import type { Actions } from './$types';
import { prisma } from '$lib/utils/prisma';
import { fail, redirect } from '@sveltejs/kit';


export const actions: Actions = {
    default: async ({ request, cookies }) => {
        const form = await request.formData();
        const email = form.get('email')?.toString();

        if (!email) {
            return { error: 'All fields are required.' };
        } else {
            return { success: ' '}
        }
        

        const user = await prisma.user.findUnique({
            where: { email },
        });
           
    }
};
