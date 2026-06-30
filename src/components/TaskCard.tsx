import type { Task } from "../types/Task";
import { Check, Pencil, Trash2 } from "lucide-react";

type TaskCardProps = {
  task: Task;

  handleDeleteTask: (id: number) => void;
  handleEditTask: (task: Task) => void;

  editingTaskId: number | null;

  editTitle: string;
  editDescription: string;

  setEditTitle: (value: string) => void;
  setEditDescription: (value: string) => void;

  handleUpdateTask: () => void;
  handleCancelEdit: () => void;
  handleToggleTask: (id: number) => void;
};

const TaskCard = ({
  task,
  handleDeleteTask,
  handleEditTask,
  editingTaskId,
  editTitle,
  editDescription,
  setEditTitle,
  setEditDescription,
  handleUpdateTask,
  handleCancelEdit,
  handleToggleTask,
}: TaskCardProps) => {
  const isEditing = editingTaskId === task.id;

  if (isEditing) {
    return (
      <article className="rounded-2xl border border-blue-200 bg-blue-50/40 p-6 shadow-sm transition-colors duration-300 dark:border-blue-900/60 dark:bg-blue-950/30">
        <div className="flex flex-col gap-3">
          <input
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"
            type="text"
            value={editTitle}
            onChange={(event) => {
              setEditTitle(event.target.value);
            }}
          />

          <input
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"
            type="text"
            value={editDescription}
            onChange={(event) => {
              setEditDescription(event.target.value);
            }}
          />

          <div className="flex justify-end gap-2 pt-2">
            <button
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-500 transition hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
              onClick={handleCancelEdit}
            >
              Cancelar
            </button>

            <button
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
              onClick={handleUpdateTask}
            >
              Salvar
            </button>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-slate-700 dark:bg-slate-900">
      <div
        className={`absolute left-0 top-0 h-full w-1 ${
          task.completed ? "bg-green-500" : "bg-orange-400"
        }`}
      />

      <div className="flex items-start gap-5 p-6">
        <button
          className={
            task.completed
              ? "mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-green-500 text-xs text-white"
              : "mt-1 h-6 w-6 shrink-0 rounded-lg border border-slate-300 bg-white transition hover:border-blue-500 hover:bg-blue-50 dark:border-slate-600 dark:bg-slate-800 dark:hover:border-blue-400 dark:hover:bg-slate-700"
          }
          onClick={() => handleToggleTask(task.id)}
          aria-label="Alterar status da tarefa"
        >
          {task.completed ? <Check size={14} strokeWidth={3} /> : null}
        </button>

        <div className="min-w-0 flex-1">
          <h3
            className={
              task.completed
                ? "text-lg font-semibold text-slate-400 line-through dark:text-slate-500"
                : "text-lg font-semibold text-slate-900 dark:text-slate-100"
            }
          >
            {task.title}
          </h3>

          <p className="mt-3 text-[16px] leading-relaxed text-slate-500 dark:text-slate-400">
            {task.description || "Sem descrição"}
          </p>
        </div>
      </div>

      <div className="flex justify-end gap-2 border-t border-slate-100 px-6 py-4 dark:border-slate-700">
        <button
          className="flex h-9 w-9 items-center justify-center rounded-lg text-blue-600 transition hover:bg-blue-50 hover:text-blue-700 dark:text-blue-400 dark:hover:bg-blue-950/40 dark:hover:text-blue-300"
          onClick={() => {
            handleEditTask(task);
          }}
          aria-label="Editar tarefa"
          title="Editar tarefa"
        >
          <Pencil size={17} />
        </button>

        <button
          className="flex h-9 w-9 items-center justify-center rounded-lg text-red-500 transition hover:bg-red-50 hover:text-red-600 dark:text-red-400 dark:hover:bg-red-950/40 dark:hover:text-red-300"
          onClick={() => {
            handleDeleteTask(task.id);
          }}
          aria-label="Excluir tarefa"
          title="Excluir tarefa"
        >
          <Trash2 size={17} />
        </button>
      </div>
    </article>
  );
};

export default TaskCard;
