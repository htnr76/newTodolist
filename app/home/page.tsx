import AccountInfor from "../components/userInfo";
import { auth } from "../auth";
import { prisma } from "@/TODO/prisma/db";
import { TaskTable } from "../components/taskTable";

async function HomePage() {
    const session = await auth();
    const user = session?.user;
    const tasks = await prisma.task.findMany({
        where: { userId: user?.id },
        orderBy: { createdAt: "desc" },
    });
    function checkTastk(tasks:any){
        if(tasks.lenght < 1){
            console.log('något e fel')
            return false
        } else{
            console.log('allt är rätt')
            return true
        }
    }
    checkTastk(tasks)
    return (
        <>
            <AccountInfor user={user} />
            <TaskTable tasks={tasks}/>
        </>
    );
}

export default HomePage;
