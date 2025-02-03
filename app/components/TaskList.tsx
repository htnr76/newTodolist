import { prisma } from "@/TODO/prisma/db";
import TaskCard from "./TaskCard";
import { Task } from "@prisma/client";
import { User } from "next-auth";
import Image from "next/image";
import check from "../public/check3.png"
import SetTask from "./removeBtn";


interface userProps {
    User: User | null
}



async function TaskList( {User}: userProps) {
  
  const userData = await prisma.task.findMany({
    where: {
      userId: User?.id,
    }
  });
  return (
    <div className="h-4/5 overflow-y-auto w-1/5 border-2 border-solid border-white ml-5 p-2 rounded-xl">
        <h1 className="text-2xl text-center text-white">Your Tasks</h1>
        <ul className="border-white border-solid rounded border-x-2 p-1 h-4/5">
        {userData?.length ? (
            userData.map((task: Task) => <TaskCard task={task} key={task?.id} />)
        ) : (
            <div  className="text-center text-white text-2xl p-5 flex flex-col items-center justify-center align-middle">
                <h1 className="text-white inset-y-1/2 ">You're all done, good work :D</h1>
                <Image src={check} alt="example" width={40} height={40} />
                <SetTask userData={userData} />
            </div>
        )}
        </ul>
    </div>
  );
}


export default TaskList;