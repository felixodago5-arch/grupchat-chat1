"use client";

import { useState } from "react";

type Task = {
  id: number;
  text: string;
  done: boolean;
};

type Filter = "all" | "todo" | "done";

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "todo", label: "To do" },
  { value: "done", label: "Done" },
];

export default function ChecklistPage() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: "Book the beach house", done: true },
    { id: 2, text: "Confirm who is driving", done: false },
    { id: 3, text: "Share the packing list", done: false },
  ]);

  const [text, setText] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const doneCount = tasks.filter((task) => task.done).length;

  const percent =
    tasks.length === 0 ? 0 : Math.round((doneCount / tasks.length) * 100);

  // The filter only changes what we SHOW, never the tasks themselves
  const visibleTasks = tasks.filter((task) => {
    if (filter === "todo") return !task.done;
    if (filter === "done") return task.done;
    return true;
  });

  function addTask() {
    const trimmed = text.trim();
    if (!trimmed) return;

    setTasks([...tasks, { id: Date.now(), text: trimmed, done: false }]);
    setText("");
  }

  function toggleTask(id: number) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }

  function deleteTask(id: number) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  return (
    <div className="min-h-screen bg-page p-3 text-ink sm:p-6">
      {/* One big rounded container, like the screenshot */}
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-line bg-panel p-5 shadow-md sm:p-8">
        {/* Top bar: logo, filter pills, back link */}
        <header className="flex flex-wrap items-center justify-between gap-x-4 gap-y-4 border-b border-line pb-5">
          <a href="/" className="text-lg font-bold tracking-tight text-ink">
            GrupChat
          </a>

          <nav
            aria-label="Filter tasks"
            className="order-last flex w-full justify-center gap-1 sm:order-none sm:w-auto"
          >
            {FILTERS.map((item) => (
              <button
                key={item.value}
                type="button"
                aria-pressed={filter === item.value}
                onClick={() => setFilter(item.value)}
                className={
                  filter === item.value
                    ? "rounded-full bg-band px-5 py-2 text-sm font-medium text-white"
                    : "rounded-full border border-line bg-page px-5 py-2 text-sm font-medium text-ink transition-colors hover:border-brand hover:text-brand"
                }
              >
                {item.label}
              </button>
            ))}
          </nav>

          <a
            href="/"
            className="rounded-full border border-brand px-4 py-2 text-sm font-medium text-brand transition-colors hover:bg-brand hover:text-white"
          >
            Back to plans
          </a>
        </header>

        {/* Progress card */}
        <section
          aria-label="Plan progress"
          className="mt-6 rounded-3xl bg-band p-6 text-white sm:p-8"
        >
          <p className="text-sm font-medium text-band-muted">
            Group checklist
          </p>

          <div className="mt-1 flex items-end justify-between gap-4">
            <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              Diani, Easter weekend
            </h1>
            <span className="text-4xl font-bold tabular-nums sm:text-5xl">
              {percent}%
            </span>
          </div>

          <div
            role="progressbar"
            aria-label="Tasks completed"
            aria-valuenow={percent}
            aria-valuemin={0}
            aria-valuemax={100}
            className="mt-6 h-3 overflow-hidden rounded-full bg-white/20"
          >
            <div
              className="h-full rounded-full bg-sun-soft transition-all duration-300"
              style={{ width: `${percent}%` }}
            />
          </div>

          <p className="mt-3 text-sm text-band-muted">
            {doneCount} of {tasks.length} tasks done
          </p>
        </section>

        {/* Tasks card */}
        <section
          aria-label="Tasks"
          className="mt-6 rounded-3xl border border-line bg-page/60 p-5 sm:p-6"
        >
          <h2 className="text-lg font-semibold tracking-tight">Tasks</h2>

          <form
            className="mt-4 flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              addTask();
            }}
          >
            <input
              className="min-w-0 flex-1 rounded-full border border-line bg-panel px-5 py-3 text-ink outline-none placeholder:text-muted/70 focus:border-brand focus:ring-2 focus:ring-brand/20"
              placeholder="Add a task for the group"
              aria-label="New task"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            <button
              type="submit"
              className="rounded-full bg-brand px-6 py-3 font-medium text-white transition-colors hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              Add
            </button>
          </form>

          {visibleTasks.length === 0 ? (
            <p className="mt-6 text-sm text-muted">
              {tasks.length === 0
                ? "No tasks yet. Add the first thing your group needs to do."
                : "Nothing here. Try another filter."}
            </p>
          ) : (
            <ul className="mt-5 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-panel">
              {visibleTasks.map((task) => (
                <li
                  key={task.id}
                  className="flex items-center gap-3 px-4 py-4"
                >
                  <label className="flex min-w-0 flex-1 cursor-pointer items-center gap-3">
                    <input
                      type="checkbox"
                      className="h-5 w-5 shrink-0 accent-brand"
                      checked={task.done}
                      onChange={() => toggleTask(task.id)}
                    />

                    <span
                      className={
                        task.done
                          ? "truncate text-muted line-through"
                          : "truncate text-ink"
                      }
                    >
                      {task.text}
                    </span>
                  </label>

                  {/* Status pill */}
                  <span
                    className={
                      task.done
                        ? "shrink-0 rounded-full bg-go px-3 py-1 text-xs font-semibold text-white"
                        : "shrink-0 rounded-full bg-amber-300 px-3 py-1 text-xs font-semibold text-sun"
                    }
                  >
                    {task.done ? "Done" : "To do"}
                  </span>

                  <button
                    type="button"
                    className="shrink-0 rounded-full border border-red-200 bg-red-50 px-3 py-1 text-sm font-medium text-red-700 transition-colors hover:border-red-300 hover:bg-red-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
                    aria-label={`Delete ${task.text}`}
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
