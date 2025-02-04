"use client"

import { useState } from "react"
import { Button } from "@/TODO/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/TODO/components/ui/dialog"
import { Input } from "@/TODO/components/ui/input"
import { Label } from "@/TODO/components/ui/label"
import { Textarea } from "@/TODO/components/ui/textarea"
import { Calendar } from "@/TODO/components/ui/calendar"
import { CalendarForm } from "./datePicker"

export default function AddTaskPopover() {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log({ title, expiryDate, description })
    setOpen(false)
    // Reset form fields
    setTitle("")
    setExpiryDate("")
    setDescription("")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add New Task</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="expiry-date" className="text-right">
              Expiry Date
            </Label>
            <div className="col-span-3">
              <CalendarForm/>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3"
              rows={3}
            />
          </div>
          <Button type="submit" className="ml-auto">
            Add Task
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

