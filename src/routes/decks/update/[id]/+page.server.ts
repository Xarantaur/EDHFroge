import type { PageServerLoad } from '../../$types';
import { prisma } from '$lib/utils/prisma'
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ params, locals }) => {
    const id = Params.RouteId;
    
    if (!locals.user) throw redirect(303, '/login');
    
    const deck = await prisma.deck.findUnique({
        where: {
            id: params.id,
            userId: locals.user.id
        },
        include: { 
            commander: true,
            cards: true
        }
    });

    if(!deck) throw redirect(303, '/decks')
        
    return { deck }
}