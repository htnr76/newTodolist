"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/TODO/components/ui/button"
import { Calendar } from "@/TODO/components/ui/calendar"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/TODO/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/TODO/components/ui/popover"
import { cn } from "@/TODO/lib/utils"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/TODO/components/ui/dialog"
import { Input } from "@/TODO/components/ui/input"
import { Label } from "@/TODO/components/ui/label"
import { Textarea } from "@/TODO/components/ui/textarea"
import CreateTask from "./actions"

const FormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  date: z.date().optional(),
  description: z.string().optional(),
})

export default function AddTaskPopover() {
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      date: undefined,
      description: ""
    }
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const task = {
      title: data.title,
      description: data.description || "",
      date: data.date ? format(data.date, "yyyy-MM-dd") : ""
    }
    
    CreateTask({ task })
    setOpen(false)
    form.reset()
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <FormControl>
                    <Input {...field} id="title" className="col-span-3" required />
                  </FormControl>
                  <FormMessage className="col-span-3 col-start-2" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="date" className="text-right">
                    Expiry Date
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal col-span-3",
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
                  <FormMessage className="col-span-3 col-start-2" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <FormControl>
                    <Textarea {...field} id="description" className="col-span-3" rows={3} />
                  </FormControl>
                  <FormMessage className="col-span-3 col-start-2" />
                </FormItem>
              )}
            />
            <Button type="submit" className="ml-auto">
              Add Task
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
