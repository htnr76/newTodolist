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
    return (
        <>
            <AccountInfor user={user} />
            <TaskTable tasks={tasks}/>
        </>
    );
}

export default HomePage;
