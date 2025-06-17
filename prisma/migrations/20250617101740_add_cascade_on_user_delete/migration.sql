-- DropForeignKey
ALTER TABLE "decks" DROP CONSTRAINT "decks_userId_fkey";

-- AddForeignKey
ALTER TABLE "decks" ADD CONSTRAINT "decks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
