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
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-slate-900">Nova tarefa</h2>

      <div className="grid gap-4 lg:grid-cols-[1fr_1fr_auto]">
        <input
          className="rounded-lg border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          type="text"
          placeholder="Título da tarefa"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />

        <input
          className="rounded-lg border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          type="text"
          placeholder="Descrição (opcional)"
          value={description}
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />

        <button
          className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
          onClick={handleCreateTask}
        >
          + Criar tarefa
        </button>
      </div>
    </div>
  );
};

export default TaskForm;
