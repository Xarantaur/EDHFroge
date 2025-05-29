import type { PageServerLoad } from './$types'
import { prisma } from '$lib/utils/prisma'
import { error, redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ params, locals }) => {
    if (!locals.user) throw redirect(303, '/login');
    
    const deck = await prisma.deck.findUnique({
        where: {
            id: params.id,
        },
        include: { 
            commander: true,
            cards: true
        }
    });

    if(!deck || deck.userId !== locals.user.id ) {
        throw error(404, 'Deck not Found')
    }
        console.log(deck)
    return { deck }
}