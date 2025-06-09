import type { DeckCardColor } from "$lib/types/DeckCardColor";
import type { DeckCardColorIdentity } from "$lib/types/DeckCardColorIdentity";
import type { ParsedDeckCard } from "$lib/types/parsedDeckCard";


export function transformToParsedDeckCard(raw: any): ParsedDeckCard {
    
    {
        const face = raw.image_uris ? raw : raw.card_faces?.[0];
        const back = raw.card_faces?.[1]

        const images = [];

        if (face?.image_uris){
            if (face.image_uris.normal) {
                images.push({ imageType: 'normal', uri: face.image_uris.normal });
            }
            if (face.image_uris.art_crop) {
                images.push({ imageType: 'art_crop', uri: face.image_uris.art_crop})
            }
        }   

        if(back?.image_uris) {
            if(back.image_uris.normal) {
                images.push({ imageType: 'normal', uri: back.image_uris.normal });
            }
            if(back.image_uris.art_crop) {
                images.push({ imageType: 'art_crop', uri: back.image_uris.art_crop });
            }
        }

        const colors: Omit<DeckCardColor, 'id' | 'deckCardId'>[] = (raw.colors ?? []).map((color: string) => ({
		color,
	}));

	const colorIdentity: Omit<DeckCardColorIdentity, 'id' | 'deckCardId'>[] = (raw.color_identity ?? []).map(
		(color: string) => ({ color })
	);

        return {
            card: {
                id: raw.id,
                deckId: raw.deckId,
                cardName: raw.name,
                typeLine: face?.type_line ?? raw.type_line ?? '',
                cmc: raw.cmc ?? 0,
                quantity: raw.quantity ?? 1
            },
            images,
            colors,
            colorIdentity,
        }
     }
}
