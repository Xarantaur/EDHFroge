import type { RequestHandler } from "./$types";
import { json, redirect } from "@sveltejs/kit"
import { updateDeck } from "$lib/server/prisma/deckRepo";

export const POST: RequestHandler = async ({ request, params, locals }) => {
    const user = locals.user;
    const deckId = params.id;

    if(!user) {
        throw redirect( 303, '/user/login')
    }

    const { name, cards, commander } = await request.json();

    if(!name || !Array.isArray(cards) || !commander) {
        return json({ error: 'Missing or invalid deck data.' }, { status: 400 })
    }

    try {
		
		await updateDeck({ deckId, name, cards, commander})

    return json({ success: true, deckId });
    } catch (error) {
        console.error('Deck Update failed:', error);
        return json({ error: 'Internal server Error'}, { status: 500 })
    }
};