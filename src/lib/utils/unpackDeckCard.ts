import type { DeckCard } from '$lib/types/cards';
import type { DeckCardImage } from '$lib/types/DeckCardImage';
import type { DeckCardColor } from '$lib/types/DeckCardColor';
import type { DeckCardColorIdentity } from '$lib/types/DeckCardColorIdentity';

export function unpackDeckCard({
	card,
	images,
	colors,
	colorIdentity
}: {
	card: Omit<DeckCard, 'id'> & {image_uris: any};
	images: Omit<DeckCardImage, 'id' | 'deckCardId'>[];
	colors: Omit<DeckCardColor, 'id' | 'deckCardId'>[];
	colorIdentity: Omit<DeckCardColorIdentity, 'id' | 'deckCardId'>[];
}): DeckCard {
	const getImage = (type: string) =>
		images.find((img) => img.imageType === type)?.uri ?? '';

	return {
		...card,
		id: '', // midlertidigt – udfyld hvis nødvendigt
		image_uris: {
			normal: getImage('normal'),
			small: '', // eller hent hvis nødvendigt
			art_crop: getImage('art_crop'),
			backside: null // tilføj hvis du håndterer bagsider
		},
		colors: colors.map((c) => c.color),
		colorIdentity: colorIdentity.map((ci) => ci.color)
	};
}
