type TaskFormProps = {
  title: string;
  description: string;

  setTitle: (value: string) => void;
  setDescription: (value: string) => void;

  handleCreateTask: () => void;
};

const TaskForm = ({
  title,
  description,
  setTitle,
  setDescription,
  handleCreateTask,
}: TaskFormProps) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-colors duration-300 dark:border-slate-700 dark:bg-slate-800 sm:p-6">
      <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-100 lg:text-xl">
        Nova tarefa
      </h2>

      <div className="grid gap-3 sm:gap-4 lg:grid-cols-[1fr_1fr_auto]">
        <input
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 sm:text-base"
          type="text"
          placeholder="Título da tarefa"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />

        <input
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 sm:text-base"
          type="text"
          placeholder="Descrição (opcional)"
          value={description}
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />

        <button
          className="w-full rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 sm:text-base lg:w-auto"
          onClick={handleCreateTask}
        >
          + Criar tarefa
        </button>
      </div>
    </div>
  );
};

export default TaskForm;
