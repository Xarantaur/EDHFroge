/*
  Warnings:

  - You are about to drop the column `colorIdentity` on the `deck_cards` table. All the data in the column will be lost.
  - You are about to drop the column `colors` on the `deck_cards` table. All the data in the column will be lost.
  - You are about to drop the column `image_uris` on the `deck_cards` table. All the data in the column will be lost.
  - You are about to drop the column `commanderId` on the `decks` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "decks" DROP CONSTRAINT "decks_commanderId_fkey";

-- AlterTable
ALTER TABLE "deck_cards" DROP COLUMN "colorIdentity",
DROP COLUMN "colors",
DROP COLUMN "image_uris";

-- AlterTable
ALTER TABLE "decks" DROP COLUMN "commanderId";

-- CreateTable
CREATE TABLE "deck_card_colors" (
    "id" TEXT NOT NULL,
    "deckCardId" TEXT NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "deck_card_colors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "deck_commanders" (
    "id" TEXT NOT NULL,
    "deckId" TEXT NOT NULL,
    "deckCardId" TEXT NOT NULL,

    CONSTRAINT "deck_commanders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "deck_card_images" (
    "id" TEXT NOT NULL,
    "deckCardId" TEXT NOT NULL,
    "imageType" TEXT NOT NULL,
    "uri" TEXT NOT NULL,

    CONSTRAINT "deck_card_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "deck_card_color_identities" (
    "id" TEXT NOT NULL,
    "deckCardId" TEXT NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "deck_card_color_identities_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "deck_commanders_deckId_key" ON "deck_commanders"("deckId");

-- CreateIndex
CREATE UNIQUE INDEX "deck_commanders_deckCardId_key" ON "deck_commanders"("deckCardId");

-- AddForeignKey
ALTER TABLE "deck_card_colors" ADD CONSTRAINT "deck_card_colors_deckCardId_fkey" FOREIGN KEY ("deckCardId") REFERENCES "deck_cards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deck_commanders" ADD CONSTRAINT "deck_commanders_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "decks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deck_commanders" ADD CONSTRAINT "deck_commanders_deckCardId_fkey" FOREIGN KEY ("deckCardId") REFERENCES "deck_cards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deck_card_images" ADD CONSTRAINT "deck_card_images_deckCardId_fkey" FOREIGN KEY ("deckCardId") REFERENCES "deck_cards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deck_card_color_identities" ADD CONSTRAINT "deck_card_color_identities_deckCardId_fkey" FOREIGN KEY ("deckCardId") REFERENCES "deck_cards"("id") ON DELETE CASCADE ON UPDATE CASCADE;
