<script lang="ts">
	import { searchCardByName } from '$lib/utils/scryfall';
    let deck: any[] = [{
    "object": "card",
    "id": "0fdae05f-7bdc-45fb-b9b9-e5ec3766f965",
    "oracle_id": "d7ac4be1-dcca-49b6-8ddb-d1b0e6cf2dcf",
    "multiverse_ids": [
        658683
    ],
    "mtgo_id": 124941,
    "tcgplayer_id": 545339,
    "cardmarket_id": 764802,
    "name": "Queen Marchesa",
    "lang": "en",
    "released_at": "2024-04-19",
    "uri": "https://api.scryfall.com/cards/0fdae05f-7bdc-45fb-b9b9-e5ec3766f965",
    "scryfall_uri": "https://scryfall.com/card/otc/239/queen-marchesa?utm_source=api",
    "layout": "normal",
    "highres_image": true,
    "image_status": "highres_scan",
    "image_uris": {
        "small": "https://cards.scryfall.io/small/front/0/f/0fdae05f-7bdc-45fb-b9b9-e5ec3766f965.jpg?1712354769",
        "normal": "https://cards.scryfall.io/normal/front/0/f/0fdae05f-7bdc-45fb-b9b9-e5ec3766f965.jpg?1712354769",
        "large": "https://cards.scryfall.io/large/front/0/f/0fdae05f-7bdc-45fb-b9b9-e5ec3766f965.jpg?1712354769",
        "png": "https://cards.scryfall.io/png/front/0/f/0fdae05f-7bdc-45fb-b9b9-e5ec3766f965.png?1712354769",
        "art_crop": "https://cards.scryfall.io/art_crop/front/0/f/0fdae05f-7bdc-45fb-b9b9-e5ec3766f965.jpg?1712354769",
        "border_crop": "https://cards.scryfall.io/border_crop/front/0/f/0fdae05f-7bdc-45fb-b9b9-e5ec3766f965.jpg?1712354769"
    },
    "mana_cost": "{1}{R}{W}{B}",
    "cmc": 4,
    "type_line": "Legendary Creature — Human Assassin",
    "oracle_text": "Deathtouch, haste\nWhen Queen Marchesa enters, you become the monarch.\nAt the beginning of your upkeep, if an opponent is the monarch, create a 1/1 black Assassin creature token with deathtouch and haste.",
    "power": "3",
    "toughness": "3",
    "colors": [
        "B",
        "R",
        "W"
    ],
    "color_identity": [
        "B",
        "R",
        "W"
    ],
    "keywords": [
        "Haste",
        "Deathtouch"
    ],
    "all_parts": [
        {
            "object": "related_card",
            "id": "3a0d35d2-1e30-4aba-abf5-4ac2707c9ea3",
            "component": "token",
            "name": "Assassin",
            "type_line": "Token Creature — Assassin",
            "uri": "https://api.scryfall.com/cards/3a0d35d2-1e30-4aba-abf5-4ac2707c9ea3"
        },
        {
            "object": "related_card",
            "id": "97793b27-54d1-4870-9a86-680741ca8730",
            "component": "combo_piece",
            "name": "The Monarch",
            "type_line": "Card",
            "uri": "https://api.scryfall.com/cards/97793b27-54d1-4870-9a86-680741ca8730"
        },
        {
            "object": "related_card",
            "id": "0fdae05f-7bdc-45fb-b9b9-e5ec3766f965",
            "component": "combo_piece",
            "name": "Queen Marchesa",
            "type_line": "Legendary Creature — Human Assassin",
            "uri": "https://api.scryfall.com/cards/0fdae05f-7bdc-45fb-b9b9-e5ec3766f965"
        }
    ],
    "legalities": {
        "standard": "not_legal",
        "future": "not_legal",
        "historic": "not_legal",
        "timeless": "not_legal",
        "gladiator": "not_legal",
        "pioneer": "not_legal",
        "explorer": "not_legal",
        "modern": "not_legal",
        "legacy": "legal",
        "pauper": "not_legal",
        "vintage": "legal",
        "penny": "not_legal",
        "commander": "legal",
        "oathbreaker": "legal",
        "standardbrawl": "not_legal",
        "brawl": "not_legal",
        "alchemy": "not_legal",
        "paupercommander": "not_legal",
        "duel": "legal",
        "oldschool": "not_legal",
        "premodern": "not_legal",
        "predh": "not_legal"
    },
    "games": [
        "paper",
        "mtgo"
    ],
    "reserved": false,
    "game_changer": false,
    "foil": false,
    "nonfoil": true,
    "finishes": [
        "nonfoil"
    ],
    "oversized": false,
    "promo": false,
    "reprint": true,
    "variation": false,
    "set_id": "d6548798-0c10-4509-b71a-2d8b1d14665a",
    "set": "otc",
    "set_name": "Outlaws of Thunder Junction Commander",
    "set_type": "commander",
    "set_uri": "https://api.scryfall.com/sets/d6548798-0c10-4509-b71a-2d8b1d14665a",
    "set_search_uri": "https://api.scryfall.com/cards/search?order=set&q=e%3Aotc&unique=prints",
    "scryfall_set_uri": "https://scryfall.com/sets/otc?utm_source=api",
    "rulings_uri": "https://api.scryfall.com/cards/0fdae05f-7bdc-45fb-b9b9-e5ec3766f965/rulings",
    "prints_search_uri": "https://api.scryfall.com/cards/search?order=released&q=oracleid%3Ad7ac4be1-dcca-49b6-8ddb-d1b0e6cf2dcf&unique=prints",
    "collector_number": "239",
    "digital": false,
    "rarity": "rare",
    "card_back_id": "0aeebaf5-8c7d-4636-9e82-8c27447861f7",
    "artist": "Kieran Yanner",
    "artist_ids": [
        "aa7e89ed-d294-4633-9057-ce04dacfcfa4"
    ],
    "illustration_id": "4dd3219b-2923-425d-9dc8-c346a89d7d66",
    "border_color": "black",
    "frame": "2015",
    "frame_effects": [
        "legendary"
    ],
    "security_stamp": "oval",
    "full_art": false,
    "textless": false,
    "booster": false,
    "story_spotlight": false,
    "edhrec_rank": 2237,
    "prices": {
        "usd": "0.53",
        "usd_foil": null,
        "usd_etched": null,
        "eur": "0.47",
        "eur_foil": null,
        "tix": "1.31"
    },
    "related_uris": {
        "gatherer": "https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=658683&printed=false",
        "tcgplayer_infinite_articles": "https://partner.tcgplayer.com/c/4931599/1830156/21018?subId1=api&trafcat=tcgplayer.com%2Fsearch%2Farticles&u=https%3A%2F%2Fwww.tcgplayer.com%2Fsearch%2Farticles%3FproductLineName%3Dmagic%26q%3DQueen%2BMarchesa",
        "tcgplayer_infinite_decks": "https://partner.tcgplayer.com/c/4931599/1830156/21018?subId1=api&trafcat=tcgplayer.com%2Fsearch%2Fdecks&u=https%3A%2F%2Fwww.tcgplayer.com%2Fsearch%2Fdecks%3FproductLineName%3Dmagic%26q%3DQueen%2BMarchesa",
        "edhrec": "https://edhrec.com/route/?cc=Queen+Marchesa"
    },
    "purchase_uris": {
        "tcgplayer": "https://partner.tcgplayer.com/c/4931599/1830156/21018?subId1=api&u=https%3A%2F%2Fwww.tcgplayer.com%2Fproduct%2F545339%3Fpage%3D1",
        "cardmarket": "https://www.cardmarket.com/en/Magic/Products/Singles/Commander-Outlaws-of-Thunder-Junction/Queen-Marchesa?referrer=scryfall&utm_campaign=card_prices&utm_medium=text&utm_source=scryfall",
        "cardhoarder": "https://www.cardhoarder.com/cards/124941?affiliate_id=scryfall&ref=card-profile&utm_campaign=affiliate&utm_medium=card&utm_source=scryfall"
    }
},
{
    "object": "card",
    "id": "561cfc04-65ea-49a4-8638-b4631a7cf828",
    "oracle_id": "d7950018-d744-48a8-81aa-0d8384703f48",
    "multiverse_ids": [
        599080
    ],
    "mtgo_id": 107901,
    "tcgplayer_id": 457532,
    "cardmarket_id": 688764,
    "name": "Zur the Enchanter",
    "lang": "en",
    "released_at": "2023-01-13",
    "uri": "https://api.scryfall.com/cards/561cfc04-65ea-49a4-8638-b4631a7cf828",
    "scryfall_uri": "https://scryfall.com/card/dmr/206/zur-the-enchanter?utm_source=api",
    "layout": "normal",
    "highres_image": true,
    "image_status": "highres_scan",
    "image_uris": {
        "small": "https://cards.scryfall.io/small/front/5/6/561cfc04-65ea-49a4-8638-b4631a7cf828.jpg?1675200810",
        "normal": "https://cards.scryfall.io/normal/front/5/6/561cfc04-65ea-49a4-8638-b4631a7cf828.jpg?1675200810",
        "large": "https://cards.scryfall.io/large/front/5/6/561cfc04-65ea-49a4-8638-b4631a7cf828.jpg?1675200810",
        "png": "https://cards.scryfall.io/png/front/5/6/561cfc04-65ea-49a4-8638-b4631a7cf828.png?1675200810",
        "art_crop": "https://cards.scryfall.io/art_crop/front/5/6/561cfc04-65ea-49a4-8638-b4631a7cf828.jpg?1675200810",
        "border_crop": "https://cards.scryfall.io/border_crop/front/5/6/561cfc04-65ea-49a4-8638-b4631a7cf828.jpg?1675200810"
    },
    "mana_cost": "{1}{W}{U}{B}",
    "cmc": 4,
    "type_line": "Legendary Creature — Human Wizard",
    "oracle_text": "Flying\nWhenever Zur attacks, you may search your library for an enchantment card with mana value 3 or less, put it onto the battlefield, then shuffle.",
    "power": "1",
    "toughness": "4",
    "colors": [
        "B",
        "U",
        "W"
    ],
    "color_identity": [
        "B",
        "U",
        "W"
    ],
    "keywords": [
        "Flying"
    ],
    "legalities": {
        "standard": "not_legal",
        "future": "not_legal",
        "historic": "not_legal",
        "timeless": "not_legal",
        "gladiator": "not_legal",
        "pioneer": "not_legal",
        "explorer": "not_legal",
        "modern": "legal",
        "legacy": "legal",
        "pauper": "not_legal",
        "vintage": "legal",
        "penny": "legal",
        "commander": "legal",
        "oathbreaker": "legal",
        "standardbrawl": "not_legal",
        "brawl": "not_legal",
        "alchemy": "not_legal",
        "paupercommander": "not_legal",
        "duel": "legal",
        "oldschool": "not_legal",
        "premodern": "not_legal",
        "predh": "legal"
    },
    "games": [
        "paper",
        "mtgo"
    ],
    "reserved": false,
    "game_changer": false,
    "foil": true,
    "nonfoil": true,
    "finishes": [
        "nonfoil",
        "foil"
    ],
    "oversized": false,
    "promo": false,
    "reprint": true,
    "variation": false,
    "set_id": "ca4c2884-e539-4b7f-980d-5d6a50220f2a",
    "set": "dmr",
    "set_name": "Dominaria Remastered",
    "set_type": "masters",
    "set_uri": "https://api.scryfall.com/sets/ca4c2884-e539-4b7f-980d-5d6a50220f2a",
    "set_search_uri": "https://api.scryfall.com/cards/search?order=set&q=e%3Admr&unique=prints",
    "scryfall_set_uri": "https://scryfall.com/sets/dmr?utm_source=api",
    "rulings_uri": "https://api.scryfall.com/cards/561cfc04-65ea-49a4-8638-b4631a7cf828/rulings",
    "prints_search_uri": "https://api.scryfall.com/cards/search?order=released&q=oracleid%3Ad7950018-d744-48a8-81aa-0d8384703f48&unique=prints",
    "collector_number": "206",
    "digital": false,
    "rarity": "rare",
    "flavor_text": "Zur remained aloof from Terisiare's suffering, intent only on his own perfection.",
    "card_back_id": "0aeebaf5-8c7d-4636-9e82-8c27447861f7",
    "artist": "Pete Venters",
    "artist_ids": [
        "d54c4a1a-c0c5-4834-84db-125d341f3ad8"
    ],
    "illustration_id": "261da4b7-edd5-42be-8865-d32884f57498",
    "border_color": "black",
    "frame": "2015",
    "frame_effects": [
        "legendary"
    ],
    "security_stamp": "oval",
    "full_art": false,
    "textless": false,
    "booster": true,
    "story_spotlight": false,
    "edhrec_rank": 2517,
    "penny_rank": 5334,
    "prices": {
        "usd": "0.85",
        "usd_foil": "0.74",
        "usd_etched": null,
        "eur": "0.39",
        "eur_foil": "0.65",
        "tix": "0.03"
    },
    "related_uris": {
        "gatherer": "https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=599080&printed=false",
        "tcgplayer_infinite_articles": "https://partner.tcgplayer.com/c/4931599/1830156/21018?subId1=api&trafcat=tcgplayer.com%2Fsearch%2Farticles&u=https%3A%2F%2Fwww.tcgplayer.com%2Fsearch%2Farticles%3FproductLineName%3Dmagic%26q%3DZur%2Bthe%2BEnchanter",
        "tcgplayer_infinite_decks": "https://partner.tcgplayer.com/c/4931599/1830156/21018?subId1=api&trafcat=tcgplayer.com%2Fsearch%2Fdecks&u=https%3A%2F%2Fwww.tcgplayer.com%2Fsearch%2Fdecks%3FproductLineName%3Dmagic%26q%3DZur%2Bthe%2BEnchanter",
        "edhrec": "https://edhrec.com/route/?cc=Zur+the+Enchanter"
    },
    "purchase_uris": {
        "tcgplayer": "https://partner.tcgplayer.com/c/4931599/1830156/21018?subId1=api&u=https%3A%2F%2Fwww.tcgplayer.com%2Fproduct%2F457532%3Fpage%3D1",
        "cardmarket": "https://www.cardmarket.com/en/Magic/Products/Singles/Dominaria-Remastered/Zur-the-Enchanter?referrer=scryfall&utm_campaign=card_prices&utm_medium=text&utm_source=scryfall",
        "cardhoarder": "https://www.cardhoarder.com/cards/107901?affiliate_id=scryfall&ref=card-profile&utm_campaign=affiliate&utm_medium=card&utm_source=scryfall"
    }
}];
	let query = '';
	let card: any = null;
	let error = '';

	async function search() {
		error = '';
		card = null;

		try {
			card = await searchCardByName(query);
		query = '';
		} catch (err) {
			error = 'Card not found';
		}
	}

	function addCard() {
		deck = [...deck, card]
		console.log(deck)
	}

</script>

<div class="max-w-md mx-auto p-6">
	<h2 class="text-2xl font-bold mb-4">Search for a Card</h2>

	<div class="flex gap-2 mb-4">
		<input
			type="text"
			bind:value={query}
			placeholder="Enter card name"
			class="flex-grow p-2 border border-gray-300 rounded"
			on:keydown={(e) => e.key === 'Enter' && search()}
		/>
		<button on:click={search} class="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700">
			Search
		</button>
	</div>

	{#if error}
		<p class="text-red-500">{error}</p>
	{/if}

	{#if card}
		<div>
			<h3 class="text-lg font-semibold mb-2">{card.name}</h3>
			<img src={card.image_uris?.normal} alt={card.name} class="rounded" />
			<button on:click={addCard} class="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700">Add Card</button>
		</div>
	{/if}
</div>

<div class="flex items-center justify-center min-h-screen px-4">
	<div class="bg-gray-200 rounded shadow p-6 w-full max-w-2xl h-[90vh]">
		<div class="overflow-y-auto h-full pr-2">
			<ul class="relative space-y-2">
				{#each deck as card (card.id)}
						<li class="relative group p-2 bg-white rounded hover:bg-orange-100 transition">
							<div class="text-gray-900 font-medium">{card.name}</div>

							{#if card.image_uris?.normal}
								<div class="absolute left-0 top-0 translate-x-full ml-4 z-50 hidden group-hover:block pointer-events-none">
								<img
									src={card.image_uris.normal}
									alt={card.name}
									class="w-64 max-h-[80vh] rounded shadow-lg"
								/>
								</div>
							{/if}
					</li>
				{/each}
			</ul>

		</div>
	</div>
</div>