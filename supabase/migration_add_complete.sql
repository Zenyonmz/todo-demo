-- Adds "mark as complete" support to the existing todos table.
-- Safe to run even if you already have rows — existing rows default to false.

alter table todos
  add column if not exists is_complete boolean not null default false;

create policy "Public can update todos" on todos
  for update using (true) with check (true);
