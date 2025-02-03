import { Task } from "@prisma/client";
import { prisma } from "@/TODO/prisma/db";

interface TaskCardProps {
    task: Task;
  }

function TaskCard({ task }:  TaskCardProps) {
    return(
        
        <div className="border-white border-solid border-b-2 bg-inherit p-2 text-left flex flex-row">
            <div className="hover:cursor-pointer flex flex-col w-full">
                <button className="text-white text-3xl ">{task.title}</button>
                <button className="text-white text-sm">{task.expires.toLocaleString()}</button>
            </div>
            
            
        </div>

    )
}




export default TaskCard;