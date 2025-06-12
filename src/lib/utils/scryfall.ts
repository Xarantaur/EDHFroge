export async function autocompleteCardNames(name: string): Promise<string[]> {
    const res = await fetch(`https://api.scryfall.com/cards/autocomplete?q=${encodeURIComponent(name)}`);
    if (!res.ok) return [];
    const data = await res.json();
    return data.data || []
}

export async function searchCardByName(name: string) {
    const res = await fetch(`https://api.scryfall.com/cards/named?fuzzy=${encodeURIComponent(name)}`, {
        headers: {
            'User-Agent': 'EDH Forge/1.0 not yet launched(finals project, probabely wont ever be launch) I do not intent to break anything. heres the github: https://github.com/Xarantaur/EDHFroge'
        }
    })

    if(!res.ok) {
        throw new Error('Card not found')
    }
    const cardData = await res.json();
  
    return cardData
}

export async function getCardPrice(name: string ) {
    const res = await fetch(`https://api.scryfall.com/cards/named?fuzzy=${encodeURIComponent(name)}`,{
    headers: {
        'User-Agent': 'EDH Forge/1.0 not yet launched(finals project, probabely wont ever be launch) I do not intent to break anything. heres the github: https://github.com/Xarantaur/EDHFroge'
   } 
});

if (!res.ok) { 
    throw new Error(`Could not fetch price for "${name}"`)
}

const card = await res.json()

return {
    eur: card.prices.eur ?? null
}
}
