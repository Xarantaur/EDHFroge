import { prisma } from "../prisma"

export async function deleteSessionByToken(token: string) {
	return prisma.session.delete({
		where: { token }
	});
}


export async function CreateResetPasswordToken(userId: string, token: string, expiresAt: Date) {
    return prisma.passwordReset.create({
       data: {
				userId,
				token,
				expiresAt
				}
    })
}

export async function updateUserPassword(userId: string, hashed: string){
    return prisma.user.update({
        where: { id: userId},
        data: { password: hashed}
    })
}

export async function findResetPasswordToken(token: string){
    return prisma.passwordReset.findUnique({
		where: { token }
})
}

export async function updateUser(userId: string, hashed: string) {
    return prisma.user.update({
        where: { id: userId },
        data: {
            password: hashed
        }
    })
}

export async function createSession(token: string, userId: string, expiresAt: Date){
    return prisma.session.create({
        data: {
            token,
            userId: userId,
            expiresAt: expiresAt
        }
    })
}