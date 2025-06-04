import type { DeckCard } from "@prisma/client"
import { bannedCards } from "$lib/domain/banList"

export function isLegalCommander(card: DeckCard): boolean {
    
    const isLegendary = card.typeLine.includes("Legendary")
    const isCreature = card.typeLine.includes("Creature")

    const isPlaneswalker = card.typeLine.includes("Planeswalker")
   /*  const commanderText = card.oracleText?.toLowerCase().includes("can be your commander") */
   const isBanned = bannedCards.includes(card.cardName)

   if(isBanned){
    return false
   }
    
    return (isLegendary && isCreature) /* || ( isPlaneswalker && commmanderText) */

}