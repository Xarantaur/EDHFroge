export type DeckCard = {
		 id: string;
		 deckId: string;
         cardName: string; 
		 imageUrl?: string;
		 artCrop?: string;
		 backside?: string;
		 typeLine: string;
		 colors: string[];
		 colorIdentity: string[];
         cmc: number; 
}