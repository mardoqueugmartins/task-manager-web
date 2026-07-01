import type { Task } from "../types/Task";
import { Check, Pencil, Trash2 } from "lucide-react";

type TaskCardProps = {
  task: Task;

  handleDeleteTask: (task: Task) => void;
  handleEditTask: (task: Task) => void;

  editingTaskId: number | null;

  editTitle: string;
  editDescription: string;

  setEditTitle: (value: string) => void;
  setEditDescription: (value: string) => void;

  handleUpdateTask: () => void;
  handleCancelEdit: () => void;
  handleToggleTask: (id: number) => void;

  updatingTaskId: number | null;
  deletingTaskId: number | null;
  togglingTaskId: number | null;
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
  updatingTaskId,
  deletingTaskId,
  togglingTaskId,
}: TaskCardProps) => {
  const isEditing = editingTaskId === task.id;
  const isUpdating = updatingTaskId === task.id;
  const isDeleting = deletingTaskId === task.id;
  const isToggling = togglingTaskId === task.id;

  if (isEditing) {
    return (
      <article className="rounded-2xl border border-blue-200 bg-blue-50/40 p-4 shadow-sm transition-colors duration-300 dark:border-blue-900/60 dark:bg-blue-950/30 sm:p-6">
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
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
              onClick={handleUpdateTask}
              disabled={isUpdating}
            >
              {isUpdating ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      className={`group relative overflow-hidden rounded-2xl border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${
        task.completed
          ? "border-green-200 bg-green-50/40 dark:border-green-900/40 dark:bg-green-950/20"
          : "border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900"
      }`}
    >
      <div className="flex items-start gap-4 p-4 sm:gap-5 sm:p-6">
        <button
          className={
            task.completed
              ? "mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-green-500 text-xs text-white transition disabled:cursor-not-allowed disabled:opacity-70 sm:h-6 sm:w-6"
              : "mt-1 h-5 w-5 shrink-0 rounded-lg border border-slate-300 bg-white transition hover:border-blue-500 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-70 dark:border-slate-600 dark:bg-slate-800 dark:hover:border-blue-400 dark:hover:bg-slate-700 sm:h-6 sm:w-6"
          }
          onClick={() => handleToggleTask(task.id)}
          disabled={isToggling}
          aria-label="Alterar status da tarefa"
        >
          {task.completed ? <Check size={13} strokeWidth={3} /> : null}
        </button>

        <div className="min-w-0 flex-1">
          <h3
            className={
              task.completed
                ? "text-base font-semibold text-slate-400 line-through dark:text-slate-500 sm:text-lg"
                : "text-base font-semibold text-slate-900 dark:text-slate-100 sm:text-lg"
            }
          >
            {task.title}
          </h3>

          <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400 sm:mt-3 sm:text-[16px]">
            {task.description || "Sem descrição"}
          </p>
        </div>
      </div>

      <div className="flex justify-end gap-1.5 border-t border-slate-100 px-4 py-3 dark:border-slate-700 sm:gap-2 sm:px-6 sm:py-4">
        <button
          className="flex h-8 w-8 items-center justify-center rounded-lg text-blue-600 transition hover:bg-blue-50 hover:text-blue-700 dark:text-blue-400 dark:hover:bg-blue-950/40 dark:hover:text-blue-300 sm:h-9 sm:w-9"
          onClick={() => {
            handleEditTask(task);
          }}
          aria-label="Editar tarefa"
          title="Editar tarefa"
        >
          <Pencil size={16} />
        </button>

        <button
          className="flex h-8 w-8 items-center justify-center rounded-lg text-red-500 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50 dark:text-red-400 dark:hover:bg-red-950/40 dark:hover:text-red-300 sm:h-9 sm:w-9"
          onClick={() => {
            handleDeleteTask(task);
          }}
          disabled={isDeleting}
          aria-label="Excluir tarefa"
          title="Excluir tarefa"
        >
          {isDeleting ? "..." : <Trash2 size={16} />}
        </button>
      </div>
    </article>
  );
};

export default TaskCard;
