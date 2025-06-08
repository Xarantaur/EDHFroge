import type { User as PrismaUser, Deck } from '@prisma/client';

export type PublicUser = Omit<PrismaUser, 'password' |'sessions' | 'passwordResets' | 'password'> & {
    decks: Deck[];
};