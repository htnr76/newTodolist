'use client'

import { useState } from "react"
import { prisma } from "@/TODO/prisma/db";

export default async function SetTask({userData}: {userData: any}){
    const [tasks, setTask] = useState(userData)
    return(
        <>
        <button className="bg-red-600 rounded-lg mt-5 px-2 text-white hover:bg-red-700 duration-200">delete</button>
        </>
    )
}