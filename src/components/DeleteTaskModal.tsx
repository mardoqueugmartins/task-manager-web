import type { Task } from "../types/Task";

type DeleteTaskModalProps = {
  task: Task | null;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
};

const DeleteTaskModal = ({
  task,
  onClose,
  onConfirm,
  isDeleting,
}: DeleteTaskModalProps) => {
  if (!task) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-700 dark:bg-slate-900">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Excluir tarefa?
        </h2>

        <p className="mt-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
          Você tem certeza que deseja excluir a tarefa{" "}
          <strong className="text-slate-900 dark:text-slate-100">
            “{task.title}”
          </strong>
          ? Essa ação não pode ser desfeita.
        </p>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Cancelar
          </button>

          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isDeleting ? "Excluindo..." : "Excluir tarefa"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTaskModal;
