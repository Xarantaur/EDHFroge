export type DeckCard = {
     name: string; 
		 image_uris?: { normal?: string }
		 type_line: string;
		 colors: string[];
		 colors_identity: string[];
         cmc: number;
}