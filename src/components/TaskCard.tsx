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
}: TaskCardProps) => {
  console.log(task.id, editingTaskId, editingTaskId === task.id);
  return (
    <div>
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
        <>
          <h2>{task.title}</h2>
          <p>{task.description}</p>
        </>
      )}
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
  );
};

export default TaskCard;
