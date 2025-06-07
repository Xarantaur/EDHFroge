/*
  Warnings:

  - You are about to drop the `Deck` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DeckCard` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PasswordReset` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Deck" DROP CONSTRAINT "Deck_commanderId_fkey";

-- DropForeignKey
ALTER TABLE "Deck" DROP CONSTRAINT "Deck_userId_fkey";

-- DropForeignKey
ALTER TABLE "DeckCard" DROP CONSTRAINT "DeckCard_deckId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropTable
DROP TABLE "Deck";

-- DropTable
DROP TABLE "DeckCard";

-- DropTable
DROP TABLE "PasswordReset";

-- DropTable
DROP TABLE "Session";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "decks" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "commanderId" TEXT,

    CONSTRAINT "decks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "deck_cards" (
    "id" TEXT NOT NULL,
    "deckId" TEXT NOT NULL,
    "cardName" TEXT NOT NULL,
    "image_uris" JSONB NOT NULL,
    "typeLine" TEXT NOT NULL,
    "cmc" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "colors" TEXT[],
    "colorIdentity" TEXT[],

    CONSTRAINT "deck_cards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "password_resets" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "password_resets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "password_resets_token_key" ON "password_resets"("token");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_token_key" ON "sessions"("token");

-- AddForeignKey
ALTER TABLE "decks" ADD CONSTRAINT "decks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "decks" ADD CONSTRAINT "decks_commanderId_fkey" FOREIGN KEY ("commanderId") REFERENCES "deck_cards"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deck_cards" ADD CONSTRAINT "deck_cards_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "decks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "password_resets" ADD CONSTRAINT "password_resets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
