import { prisma } from "../prisma";


export async function createUser(email: string, password: string) {
    return prisma.user.create({
        data: {
            email,
            password: password
        }
    })
}

export async function findUserByEmail(email: string) {
    return await prisma.user.findUnique({
        where: { email }
    })
}

export async function findUserById(userId: string) {
    return prisma.user.findUnique({
        where: { id: userId },
        select: { 
            id: true,
            email: true,
			decks: true,
			createdAt: true, 
        }
    })
}

export async function DeleteUser(userId: string) {
    return prisma.user.delete({
        where: { id: userId }
    })
}

