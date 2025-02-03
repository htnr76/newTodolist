import MainHeader from "../components/MainHeader"
import { prisma } from "@/TODO/prisma/db"
import { Session } from "next-auth"
import TaskList from "../components/TaskList";
import { User } from "next-auth";
interface userProps {
    User: User | null
}

async function HomePage( {User}:  userProps){
    const tasks = await prisma.task.findMany()
    return(
        <>
        <TaskList User={User}/>
        </>
    )

}


export default HomePage;