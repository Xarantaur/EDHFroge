import type { DeckCard } from "$lib/types/cards";

export function parseDeckCard(raw: any): DeckCard {
    const face = raw.image_uris ? raw : raw.card_faces?.[0];
    const back = raw.card_faces?.[1]

    return {
        id: raw.id,
        deckId: raw.deckId,
        cardName: raw.name,
        imageUrl: face?.image_uris ?? '',
        typeLine: face?.type_line ?? raw.type_line,
        colorIdentity: raw.color_identity ?? [],
        colors: raw.colors ?? [],
        cmc: raw.cmc ?? 0,
        backside: back?.image_uris ?? '',
        artCrop: face?.image_uris?.art_crop ?? ''
    };
}