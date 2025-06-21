export const deckCardSelect = {
    id: true,
    deckId: true,
    cardName: true,
    typeLine: true,
    cmc: true,
    quantity: true,
    images: {
        select: {
        imageType: true,
        uri: true
        }
    },
    colorIdentity: { 
    select: { color: true } 
    }
}

