import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/prisma';
import { redirect } from '@sveltejs/kit';

export const DELETE: RequestHandler = async ({ locals, cookies }) => {
    const user = locals.user;

    if (!user) {
        throw redirect(303, '/user/login');
    }

     await prisma.user.delete({
		where: { id: user.id }
	});

    cookies.delete('session', {path: '/'})

    return new Response(null, { status: 204})
}