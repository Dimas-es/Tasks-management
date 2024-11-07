"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTask } from "@/context/task-context";
import { labels, priorities, statuses } from "../data/data";

const FormSchema = z.object({
  title: z.string().min(2, {
    message: "Tulis judul tugas (contoh: Update SEO)",
  }),
  label: z.string().min(2, {
    message: "Pilih Label (contoh: bug)",
  }),
  status: z.string().min(2, {
    message: "Status Tugas (contoh: belum selesai)",
  }),
  priority: z.string().min(2, {
    message: "Prioritas Tugas (contoh: tinggi)",
  }),
});

export function AddTask() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      label: "",
      title: "",
      status: "",
      priority: "",
    },
  });

  const { addTask } = useTask();

  function onSubmit(data: z.infer<typeof FormSchema>) {
    addTask(data);
    toast({
      title: "Anda mengirimkan nilai berikut:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="block p-3 md:flex gap-2 md:gap-10 justify-end items-end"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Judul tugas" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Label" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {labels.map((label: any, index: number) => (
                    <SelectItem key={index} value={label.value}>
                      {label.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {statuses.map((status: any, index: number) => (
                    <SelectItem key={index} value={status.value}>
                      <div className="flex justify-center items-center gap-3">
                        <status.icon /> {status.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Prioritas" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {priorities.map((priority: any, index: number) => (
                    <SelectItem key={index} value={priority.value}>
                      <div className="flex justify-center items-center gap-3">
                        <priority.icon /> {priority.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Tambah Tugas</Button>
      </form>
    </Form>
  );
}
