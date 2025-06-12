export interface DeckCard {
		 id?: string;
		 deckId: string;
         cardName: string; 
		 typeLine: string;
         cmc: number; 
		 quantity: number;
	     price?: string | null;
}