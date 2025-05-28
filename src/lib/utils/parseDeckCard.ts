import type { DeckCard } from "$lib/types/cards";

export function parseDeckCard(raw: any): DeckCard {
    const face = raw.image_uris ? raw : raw.card_faces?.[0];
    const back = raw.card_faces?.[1]

    return {
        name: raw.name,
        image_uris: face?.image_uris ?? {},
        type_line: face?.type_line ?? raw.type_line,
        color_identity: raw.color_identity ?? [],
        colors: raw.colors ?? [],
        cmc: raw.cmc ?? 0,
        backside: back?.image_uris ?? {},
        art_crop: face?.image_uris?.art_crop ?? {}
    };
}