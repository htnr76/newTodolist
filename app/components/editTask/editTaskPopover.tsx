"use client"

import { useState } from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/TODO/components/ui/dialog"
import { Button } from "@/TODO/components/ui/button"
import { Input } from "@/TODO/components/ui/input"
import { Textarea } from "@/TODO/components/ui/textarea"
import { Label } from "@/TODO/components/ui/label"
import { Calendar } from "@/TODO/components/ui/calendar"

import { Popover, PopoverContent, PopoverTrigger } from "@/TODO/components/ui/popover"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/TODO/components/ui/form"
import { cn } from "@/TODO/lib/utils"
import { Task } from "@prisma/client"
import DeleteTask from "./actions"

const FormSchema = z.object({
    title: z.string().min(1, "Title is required"),
    date: z.date().optional(),
    description: z.string().optional(),
})

export default function EditTaskPopover({ task }: { task: Task }) {
    console.log(task)

    const [open, setOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false)

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            title: task.title,
            date: task.expires || new Date(),
            description: task.description || "",

        },
    })

    const handleEdit = () => {
        setIsEditing(true)
    }

    const handleSave = (data: z.infer<typeof FormSchema>) => {
        setIsEditing(false)
        // Here you would typically save the changes to your backend
        console.log("Saving task:", data)
    }

    const handleDelete = async () => {
        console.log("Deleting task:", task.id)
        await DeleteTask(task.id.toString())
        setOpen(false)
    }


    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>

                <DialogTrigger asChild>
                    <Button variant="outline" className="bg-secondary hover:bg-accent">Edit Task</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="text-center">{isEditing ? "Edit Task" : "Task Details"}</DialogTitle>
                    </DialogHeader>
                    <div className="mt-4 space-y-4">
                        {isEditing ? (
                            <div>

                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(handleSave)} className="space-y-8">
                                        <FormField
                                            control={form.control}
                                            name="title"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <Label htmlFor="title">Title</Label>
                                                    <FormControl>
                                                        <Input {...field} id="title" required />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="date"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <Label>Expiry Date</Label>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <FormControl>
                                                                <Button
                                                                    variant={"outline"}
                                                                    className={cn(
                                                                        "w-full pl-3 text-left font-normal",
                                                                        !field.value && "text-muted-foreground",
                                                                    )}
                                                                >
                                                                    {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                </Button>
                                                            </FormControl>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-auto p-0" align="start">
                                                            <Calendar
                                                                mode="single"
                                                                selected={field.value}
                                                                onSelect={field.onChange}
                                                                disabled={(date) => date < new Date()}
                                                                initialFocus
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="description"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <Label htmlFor="description">Description</Label>
                                                    <FormControl>
                                                        <Textarea {...field} id="description" rows={3} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <Button type="submit" className="w-full">
                                            Save Changes
                                        </Button>
                                    </form>
                                </Form>
                            </div>

                        ) : (
                            <>
                                <div>
                                    <strong>Title:</strong> {form.getValues("title")}
                                </div>
                                <div>
                                    <strong>Expiry Date:</strong> {format(form.getValues("date") || new Date(), "PPP")}
                                </div>
                                <div>
                                    <strong>Description:</strong> {form.getValues("description")}
                                </div>
                                <Button onClick={handleEdit} className="w-full">
                                    Edit
                                </Button>
                                <Button onClick={handleDelete} className="w-full" variant={'destructive'}>
                                    Delete Task
                                </Button>
                            </>
                        )}
                    </div>
                </DialogContent>
            </Dialog >
        </>
    )
}

