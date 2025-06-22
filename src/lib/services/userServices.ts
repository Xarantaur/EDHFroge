import * as userRepo from "$lib/server/prisma/userRepo";

export async function deleteUser(userId: string) {
    return userRepo.DeleteUser(userId)
}

