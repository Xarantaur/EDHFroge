const BASE_URL = import.meta.env.PUBLIC_SCRYFALL_API;

export async function searchCardByName(name: string) {
    const res = await fetch(`https://api.scryfall.com/cards/named?fuzzy=${encodeURIComponent(name)}`, {
        headers: {
            'User-Agent': 'EDH Forge/1.0 not yet launched(finals project, probabely wont ever be launch) I do not intent to break anything. heres the github: https://github.com/Xarantaur/EDHFroge'
        }
    })
    
    if(!res.ok) {
        throw new Error('Card not found')
    }
    console.log(res.json)
    return await res.json()
    
}
console.log('Scryfall base:', BASE_URL);
/// add press enter functionality to search field.