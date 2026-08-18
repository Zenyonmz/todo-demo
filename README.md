# Today — a small Supabase todo app

> Uses Tailwind CSS v4 (CSS-first config via `@theme` in `app/globals.css` —
> there's no `tailwind.config.ts`). If you ever see an error like *"trying to
> use tailwindcss directly as a PostCSS plugin"*, it means something in your
> setup has Tailwind v3 and v4 mixed — check that `package.json` has
> `tailwindcss` and `@tailwindcss/postcss` on the same v4.x version and that
> `postcss.config.js` only lists `@tailwindcss/postcss`.

Next.js App Router + Tailwind CSS + `@supabase/supabase-js`. Tasks are read
in a Server Component; adding, completing, and deleting are all Server
Actions, so it works with JavaScript disabled and needs no client-side
Supabase calls.

## 1. Table

This app is wired to a `todos` table (`id`, `task`, `is_complete`,
`created_at`) with public read/insert/update/delete RLS policies.

- Fresh project: run [`supabase/schema.sql`](./supabase/schema.sql).
- Already have the table without `is_complete`: run
  [`supabase/migration_add_complete.sql`](./supabase/migration_add_complete.sql)
  instead — it adds the column and update policy without touching existing rows.

## 2. Environment variables

`.env.local` should already have your `NEXT_PUBLIC_SUPABASE_URL` and
`NEXT_PUBLIC_SUPABASE_ANON_KEY` from **Project Settings -> API**. If you're
setting this up fresh elsewhere:

```bash
cp .env.local.example .env.local
```

## 3. Install and run

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Project structure

```
app/
  actions.ts       Server Actions: addTask, deleteTask, toggleTask
  layout.tsx        Root layout, loads fonts
  page.tsx          Server Component — fetches todos from Supabase
  globals.css
components/
  AddTaskForm.tsx    Form bound to the addTask action
  TaskRow.tsx         One task: toggle-complete + delete forms
lib/
  supabase/server.ts  Supabase client for server-side use only
  types.ts
supabase/
  schema.sql          Table + RLS policies
```

## Notes

- `revalidatePath("/")` in each Server Action re-runs the Server Component's
  data fetch after a mutation, so the list stays in sync without any client
  state or `useEffect`.
- The Supabase client in `lib/supabase/server.ts` uses the public anon key
  and is only ever imported from Server Components/Actions — it's never sent
  to the browser bundle.
- Delete and complete controls are plain `<form action={...}>` elements, so
  they work even before hydration finishes.
