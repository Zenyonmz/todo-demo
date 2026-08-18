import { deleteTask, toggleTask } from "@/app/actions";
import type { Task } from "@/lib/types";

export default function TaskRow({ task, index }: { task: Task; index: number }) {
  return (
    <li className="group flex items-center gap-4 border-b border-ink/8 py-4 last:border-b-0">
      <span className="w-6 shrink-0 font-mono text-xs text-ink/30">
        {String(index + 1).padStart(2, "0")}
      </span>

      <form action={toggleTask}>
        <input type="hidden" name="id" value={task.id} />
        <input type="hidden" name="is_complete" value={String(task.is_complete)} />
        <button
          type="submit"
          aria-label={task.is_complete ? "Mark as not done" : "Mark as done"}
          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors ${
            task.is_complete
              ? "border-moss-600 bg-moss-600"
              : "border-ink/25 hover:border-moss-500"
          }`}
        >
          {task.is_complete && (
            <svg viewBox="0 0 12 12" className="h-3 w-3 text-paper" fill="none">
              <path
                d="M2.5 6.2 5 8.7 9.5 3.5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>
      </form>

      <p
        className={`flex-1 text-base leading-snug ${
          task.is_complete ? "text-ink/35 line-through decoration-ink/25" : "text-ink"
        }`}
      >
        {task.task}
      </p>

      <form action={deleteTask}>
        <input type="hidden" name="id" value={task.id} />
        <button
          type="submit"
          aria-label={`Delete "${task.task}"`}
          className="rounded-full p-1.5 text-ink/25 opacity-0 transition-colors hover:bg-clay-500/10 hover:text-clay-500 focus-visible:opacity-100 group-hover:opacity-100"
        >
          <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none">
            <path
              d="M4 4l8 8M12 4l-8 8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </form>
    </li>
  );
}
