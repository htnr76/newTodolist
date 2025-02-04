"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/TODO/components/ui/table"
import { Button } from "@/TODO/components/ui/button"
import { Edit } from "lucide-react"

// Function to format the date
function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function TaskTable({ tasks }: { tasks: any }) {
  const handleEdit = (id: number) => {
    // Implement edit functionality here
    console.log(`Editing task with id: ${id}`)
  }

  return (
    <div className="container mx-auto py-10 text-white">
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
                <Button variant="ghost" size="sm" onClick={() => handleEdit(task.id)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

