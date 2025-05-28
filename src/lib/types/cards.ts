export type DeckCard = {
     name: string; 
		 image_uris?: { normal?: string }
		 type_line: string;
		 colors: string[];
		 color_identity: string[];
         cmc: number;
		 backside: { normal?: string };
		art_crop?: string;
}