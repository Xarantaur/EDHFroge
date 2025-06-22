import { prisma } from '$lib/server/prisma'

export async function findExistingCommanderByDeckId(deckId: string) {
    return prisma.deckCommander.findUnique({
        where: { deckId }
    })
}

export async function updateDeckCommander(id: string, deckCardId: string) {
    return prisma.deckCommander.update({
        where: { id },
        data: { deckCardId }
    })
}
export async function createDeckCommanderLink(deckId: string, deckCardId: string) {
    return prisma.deckCommander.create({
        data: { deckId, deckCardId }
    });
}