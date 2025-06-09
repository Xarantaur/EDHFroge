import type { DeckCard } from "./cards";
import type { DeckCardImage } from "./DeckCardImage";
import type { DeckCardColor } from "./DeckCardColor";
import type { DeckCardColorIdentity } from "./DeckCardColorIdentity";

export interface ParsedDeckCard {
    card: DeckCard;
    images: Omit<DeckCardImage, 'id' | 'deckCardId'>[];
	colors: Omit<DeckCardColor, 'id' | 'deckCardId'>[];
	colorIdentity: Omit<DeckCardColorIdentity, 'id' | 'deckCardId'>[];
}