import type { RequestHandler } from './$types';
import { deleteDeck } from '$lib/services/deckService';
import { redirect } from '@sveltejs/kit';

 export const POST: RequestHandler = async ({ params, locals }) => {
    const user = locals.user;
    const deckId = params.id

    if (!user) {
        throw redirect(303, '/user/login');
    }
    
   await deleteDeck(deckId)

    throw redirect(303, '/decks'); 
}