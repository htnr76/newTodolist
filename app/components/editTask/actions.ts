'use server';

import { auth } from "../../auth";

import { prisma } from "@/TODO/prisma/db";

export default async function DeleteTask(taskId: string) {
    const session = await auth();
    if (!session?.user?.id) {
        throw new Error("Unauthorized")
    }
    const task = await prisma.task.delete({
        where: { id: parseInt(taskId) },
    })
    return task;
}