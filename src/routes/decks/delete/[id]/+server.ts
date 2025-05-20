import type { RequestHandler } from './$types';
import { prisma } from '$lib/utils/prisma';
import { redirect } from '@sveltejs/kit';
import toast from 'svelte-french-toast';

export const POST: RequestHandler = async ({ params, locals }) => {
    const user = locals.user;
    const deckId = params.id

    if (!user) {
        throw redirect(303, '/login');
    }
    
   await prisma.deck.delete({
		where: { id: deckId }
	});

    throw redirect(303, '/decks'); 
}