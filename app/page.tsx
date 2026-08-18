import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { Task } from "@/lib/types";
import AddTaskForm from "@/components/AddTaskForm";
import TaskRow from "@/components/TaskRow";

// Always fetch fresh data — this page mutates via Server Actions elsewhere.
export const dynamic = "force-dynamic";

async function getTasks(): Promise<Task[]> {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("todos")
    .select("id, task, is_complete, created_at")
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Failed to load tasks:", error.message);
    return [];
  }

  return data ?? [];
}

export default async function HomePage() {
  const tasks = await getTasks();
  const remaining = tasks.filter((t) => !t.is_complete).length;
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-xl flex-col px-6 py-16 sm:py-24">
      <header className="mb-10">
        <p className="font-mono text-xs uppercase tracking-wider text-ink/40">{today}</p>
        <h1 className="mt-2 font-display text-4xl italic text-ink">Today</h1>
        <p className="mt-2 text-sm text-ink/50">
          {tasks.length === 0
            ? "Nothing on the list yet."
            : remaining === 0
              ? "Everything's done. Well played."
              : `${remaining} ${remaining === 1 ? "thing" : "things"} left to do.`}
        </p>
      </header>

      <div className="mb-8 rounded-2xl border border-ink/8 bg-white/60 p-5 shadow-soft">
        <AddTaskForm />
      </div>

      {tasks.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-ink/15 px-6 py-14 text-center">
          <p className="text-sm text-ink/40">
            Add the first thing you need to do today.
          </p>
        </div>
      ) : (
        <ul className="rounded-2xl border border-ink/8 bg-white/60 px-5 shadow-soft">
          {tasks.map((task, index) => (
            <TaskRow key={task.id} task={task} index={index} />
          ))}
        </ul>
      )}
    </main>
  );
}
