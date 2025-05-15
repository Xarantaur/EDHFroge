const BASE_URL = import.meta.env.PUBLIC_SCRYFALL_API;

export async function searchCardByName(name: string) {
    const res = await fetch(`https://api.scryfall.com/cards/named?fuzzy=${encodeURIComponent(name)}`)

    if(!res.ok) {
        throw new Error('Card not found')
    }
    return await res.json()
}
console.log('Scryfall base:', BASE_URL);
