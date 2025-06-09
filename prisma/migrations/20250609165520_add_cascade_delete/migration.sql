-- DropForeignKey
ALTER TABLE "deck_card_colors" DROP CONSTRAINT "deck_card_colors_deckCardId_fkey";

-- AddForeignKey
ALTER TABLE "deck_card_colors" ADD CONSTRAINT "deck_card_colors_deckCardId_fkey" FOREIGN KEY ("deckCardId") REFERENCES "deck_cards"("id") ON DELETE CASCADE ON UPDATE CASCADE;
