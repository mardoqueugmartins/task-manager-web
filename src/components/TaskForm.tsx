type TaskFormProps = {
  title: string;
  description: string;

  setTitle: (value: string) => void;
  setDescription: (value: string) => void;

  handleCreateTask: () => void;
};

const TaskForm = ({title, description, setTitle, setDescription, handleCreateTask}: TaskFormProps) => {
  return (
    <div className="rounded-lg bg-white p-4 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-slate-900">Nova tarefa</h2>

      <div className="flex flex-col gap-3">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Título
          </label>

          <input
            className="w-full rounded-lg border border-slate-200 px-4 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            type="text"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Descrição
          </label>

          <input
            className="w-full rounded-lg border border-slate-200 px-4 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            type="text"
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />
        </div>

        <button
          className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
          onClick={handleCreateTask}
        >
          Criar tarefa
        </button>
      </div>
    </div>
  );
}

export default TaskForm
