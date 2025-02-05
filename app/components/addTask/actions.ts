'use server';
import { prisma } from "@/TODO/prisma/db";
import { auth } from "../../auth";
interface Task {
    title: string;
    description: string;
    date: string;
}
export default async function CreateTask({task}: {task:Task}){
    console.log(task)
    try{
        const session = await auth();
        if(!session?.user?.id){
            throw new Error("Unauthorized")
        }

        const newTask = await prisma.task.create({
            data: {
                userId: session.user.id as string,
                title: task.title,
                description: task.description,
                expires: new Date(task.date + 'T00:00:00.000Z')
            }
        })
        console.log(newTask)
        return newTask;
    } catch (error) {
        console.error("Error creating task:", error);
        throw new Error("Failed to create task");
    }
}