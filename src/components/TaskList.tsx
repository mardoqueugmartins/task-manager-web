import type { Task } from "../types/Task";
import TaskCard from "./TaskCard";

type TaskListProps = {
  pendingTasks: Task[];
  completedTasks: Task[];

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

const TaskList = ({
  pendingTasks,
  completedTasks,
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
}: TaskListProps) => {
  const renderTask = (task: Task) => (
    <TaskCard
      key={task.id}
      task={task}
      handleDeleteTask={handleDeleteTask}
      handleEditTask={handleEditTask}
      editingTaskId={editingTaskId}
      editTitle={editTitle}
      editDescription={editDescription}
      setEditTitle={setEditTitle}
      setEditDescription={setEditDescription}
      handleUpdateTask={handleUpdateTask}
      handleCancelEdit={handleCancelEdit}
      handleToggleTask={handleToggleTask}
    />
  );

  return (
    <div className="grid w-full gap-8 xl:grid-cols-2">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-slate-700 dark:bg-slate-800">
        <div className="mb-5 flex items-center justify-between border-b border-orange-100 pb-4 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Pendentes
          </h2>

          <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-600 dark:bg-orange-950/40 dark:text-orange-300">
            {pendingTasks.length}
          </span>
        </div>

        <div className="flex flex-col gap-4">
          {pendingTasks.length > 0 ? (
            pendingTasks.map(renderTask)
          ) : (
            <p className="rounded-xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-400 dark:border-slate-700 dark:text-slate-500">
              Nenhuma tarefa pendente.
            </p>
          )}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-slate-700 dark:bg-slate-800">
        <div className="mb-5 flex items-center justify-between border-b border-green-100 pb-4 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Concluídas
          </h2>

          <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-600 dark:bg-green-950/40 dark:text-green-300">
            {completedTasks.length}
          </span>
        </div>

        <div className="flex flex-col gap-4">
          {completedTasks.length > 0 ? (
            completedTasks.map(renderTask)
          ) : (
            <p className="rounded-xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-400 dark:border-slate-700 dark:text-slate-500">
              Nenhuma tarefa concluída.
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default TaskList;
