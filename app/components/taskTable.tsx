"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/TODO/components/ui/table"
import { Button } from "@/TODO/components/ui/button"
import { Edit } from "lucide-react"
import EditTaskPopover from "./editTask/editTaskPopover"
// Function to format the date
function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  })
}

export function TaskTable({ tasks }: { tasks: any }) {
  const handleEdit = (id: number) => {
    // Implement edit functionality here
    console.log(`Editing task with id: ${id}`)
  }

  return (
    <div className="w-auto h-auto my-4 mx-5 py-10 text-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Task Name</TableHead>
            <TableHead>Done By</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task: any) => (
            <TableRow key={task.id}>
              <TableCell className="font-medium">{task.id}</TableCell>
              <TableCell>{task.title}</TableCell>
              <TableCell>{formatDate(task.expires)}</TableCell>
              <TableCell className="text-right">
                <EditTaskPopover task={task} />
              </TableCell>
            </TableRow>


          ))}
        </TableBody>
      </Table>
    </div>
  )
}

