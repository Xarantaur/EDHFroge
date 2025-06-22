import type { RequestHandler } from './$types';
import { deleteUser } from '$lib/services/userServices';
import { redirect } from '@sveltejs/kit';

export const DELETE: RequestHandler = async ({ locals, cookies }) => {
    const user = locals.user;

    if (!user) {
        throw redirect(303, '/user/login');
    }

     await deleteUser(user.id)

    cookies.delete('session', {path: '/'})

    return new Response(null, { status: 204})
}