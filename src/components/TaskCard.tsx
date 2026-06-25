import type { Task } from "../types/Task";

type TaskCardProps = {
  task: Task;

  handleDeleteTask: (id: number) => void;

  handleEditTask: (tasks: Task) => void;

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
  return (
    <div className="rounded-lg bg-white p-4 shadow-sm">
      {editingTaskId === task.id ? (
        <div>
          <input
            type="text"
            value={editTitle}
            onChange={(event) => {
              setEditTitle(event.target.value);
            }}
          />

          <input
            type="text"
            value={editDescription}
            onChange={(event) => {
              setEditDescription(event.target.value);
            }}
          />

          <button onClick={handleUpdateTask}>Salvar</button>
          <button onClick={handleCancelEdit}>Cancelar</button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <input
            className="mt-1 h-4 w-4 cursor-pointer"
            type="checkbox"
            checked={task.completed}
            onChange={() => handleToggleTask(task.id)}
          />

          <div>
            <h2
              className={
                task.completed
                  ? "text-lg font-semibold text-slate-400 line-through"
                  : "text-lg font-semibold text-slate-900"
              }
            >
              {task.title}
            </h2>

            <p className="mt-1 text-sm text-slate-600">{task.description}</p>
          </div>
        </div>
      )}

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => {
            handleDeleteTask(task.id);
          }}
        >
          Excluir tarefa
        </button>

        <button
          onClick={() => {
            handleEditTask(task);
          }}
        >
          Editar tarefa
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
