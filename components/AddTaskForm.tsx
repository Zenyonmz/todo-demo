import { addTask } from "@/app/actions";

export default function AddTaskForm() {
  return (
    <form action={addTask} className="flex items-end gap-3">
      <div className="flex-1 border-b border-ink/15 focus-within:border-moss-500 transition-colors">
        <label htmlFor="task" className="block text-xs font-mono uppercase tracking-wider text-ink/40 mb-1">
          New task
        </label>
        <input
          id="task"
          name="task"
          type="text"
          placeholder="Write a postcard to Sam…"
          autoComplete="off"
          required
          className="w-full bg-transparent pb-2 text-base placeholder:text-ink/30 focus:outline-none"
        />
      </div>
      <button
        type="submit"
        className="mb-1 shrink-0 rounded-full bg-moss-600 px-5 py-2.5 text-sm font-medium text-paper shadow-soft transition-colors hover:bg-moss-500 active:bg-moss-600"
      >
        Add
      </button>
    </form>
  );
}
