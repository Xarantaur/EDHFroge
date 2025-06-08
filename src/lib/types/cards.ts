export interface DeckCard {
		 id: string;
		 deckId: string;
         cardName: string; 
		 image_uris: {
			normal: string;
			small: string;
			art_crop?: string;
		 	backside?: {
				normal: string;
				art_crop: string;
			} | null
		 };
		 typeLine: string;
		 colors: string[];
		 colorIdentity: string[];
         cmc: number; 
		 quantity: number;
}