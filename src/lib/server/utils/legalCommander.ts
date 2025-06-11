import type { ParsedDeckCard } from "$lib/types/parsedDeckCard"
import { bannedCards } from "$lib/domain/banList"

export function isLegalCommander(card: ParsedDeckCard): boolean {
    
    const isLegendary = card.card.typeLine.includes("Legendary")
    const isCreature = card.card.typeLine.includes("Creature")

    /* const isPlaneswalker = card.typeLine.includes("Planeswalker") */
   /*  const commanderText = card.oracleText?.toLowerCase().includes("can be your commander") */
   const isBanned = bannedCards.includes(card.card.cardName)

   if(isBanned){
    return false
   }
    
    return (isLegendary && isCreature) /* || ( isPlaneswalker && commmanderText) */

}