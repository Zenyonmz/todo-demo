"use server";

import { revalidatePath } from "next/cache";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function addTask(formData: FormData) {
  const task = String(formData.get("task") ?? "").trim();
  if (!task) return;

  const supabase = createServerSupabaseClient();
  const { error } = await supabase.from("todos").insert({ task });

  if (error) {
    console.error("Failed to add task:", error.message);
    throw new Error("Could not add task. Please try again.");
  }

  revalidatePath("/");
}

export async function deleteTask(formData: FormData) {
  const id = Number(formData.get("id"));
  if (!id) return;

  const supabase = createServerSupabaseClient();
  const { error } = await supabase.from("todos").delete().eq("id", id);

  if (error) {
    console.error("Failed to delete task:", error.message);
    throw new Error("Could not delete task. Please try again.");
  }

  revalidatePath("/");
}

export async function toggleTask(formData: FormData) {
  const id = Number(formData.get("id"));
  const isComplete = formData.get("is_complete") === "true";
  if (!id) return;

  const supabase = createServerSupabaseClient();
  const { error } = await supabase
    .from("todos")
    .update({ is_complete: !isComplete })
    .eq("id", id);

  if (error) {
    console.error("Failed to update task:", error.message);
    throw new Error("Could not update task. Please try again.");
  }

  revalidatePath("/");
}
