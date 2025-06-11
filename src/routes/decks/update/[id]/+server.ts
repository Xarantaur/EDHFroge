import type { RequestHandler } from "./$types";
import { prisma } from '$lib/server/utils/prisma'
import { json, redirect } from "@sveltejs/kit"
import type { DeckCardImage } from "$lib/types/DeckCardImage";

export const POST: RequestHandler = async ({ request, params, locals }) => {
    const user = locals.user;
    const deckId = params.id;

    if(!user) {
        throw redirect( 303, '/login')
    }

    const { name, cards, commander } = await request.json();

    if(!name || !Array.isArray(cards) || !commander) {
        return json({ error: 'Missing or invalid deck data.' }, { status: 400 })
    }

    try {

        await prisma.deckCard.deleteMany({ where: { deckId } });

        const commanderRecord = await prisma.deckCard.create({
            data: {
                deckId,
                cardName: commander.card.cardName,
                typeLine: commander.card.typeLine,
                cmc: commander.card.cmc,
                images: {
                    createMany: {
						data: commander.images.map((img: Omit<DeckCardImage, 'id'>) => ({
							imageType: img.imageType,
							uri: img.uri
						}))
					}
                },
                colors: {
					createMany: {
						data: commander.colors
					}
				},
				colorIdentity: {
					createMany: {
						data: commander.colorIdentity
					}
				}
            }
        });

       for (const card of cards) {
			await prisma.deckCard.create({
				data: {
					deckId,
					cardName: card.card.cardName,
					typeLine: card.card.typeLine,
					cmc: card.card.cmc,
					quantity: card.card.quantity ?? 1,
					images: {
						createMany: {
							data: card.images.map((img: Omit<DeckCardImage, 'id'>) => ({
								imageType: img.imageType,
								uri: img.uri
							}))
						}
					},
					colors: {
						createMany: {
							data: card.colors
						}
					},
					colorIdentity: {
						createMany: {
							data: card.colorIdentity
						}
					}
				}
			});
		}

        await prisma.deck.update({
            where: { id: deckId },
            data: { name }
        });

        await prisma.deckCommander.create({
                 data: {
                deckId,
                deckCardId: commanderRecord.id
            }
        });
    
    return json({ success: true, deckId });
    } catch (error) {
        console.error('Deck Update failed:', error);
        return json({ error: 'Internal server Error'}, { status: 500 })
    }
};