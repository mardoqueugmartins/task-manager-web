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
    <div className="grid w-full gap-6 xl:grid-cols-2 xl:gap-8">
      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-colors duration-300 dark:border-slate-700 dark:bg-slate-800 sm:p-6">
        <div className="mb-4 flex items-center justify-between border-b border-orange-100 pb-3 dark:border-slate-700 sm:mb-5 sm:pb-4">
          <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100 sm:text-lg">
            Pendentes
          </h2>

          <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-600 dark:bg-orange-950/40 dark:text-orange-300 sm:text-sm">
            {pendingTasks.length}
          </span>
        </div>

        <div className="flex flex-col gap-3 sm:gap-4">
          {pendingTasks.length > 0 ? (
            pendingTasks.map(renderTask)
          ) : (
            <div className="rounded-xl border border-dashed border-slate-200 p-5 text-center dark:border-slate-700 sm:p-6">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Nenhuma tarefa pendente
              </p>

              <p className="mt-1 text-xs text-slate-400 dark:text-slate-500 sm:text-sm">
                Crie uma nova tarefa para começar.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-colors duration-300 dark:border-slate-700 dark:bg-slate-800 sm:p-6">
        <div className="mb-4 flex items-center justify-between border-b border-green-100 pb-3 dark:border-slate-700 sm:mb-5 sm:pb-4">
          <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100 sm:text-lg">
            Concluídas
          </h2>

          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-600 dark:bg-green-950/40 dark:text-green-300 sm:text-sm">
            {completedTasks.length}
          </span>
        </div>

        <div className="flex flex-col gap-3 sm:gap-4">
          {completedTasks.length > 0 ? (
            completedTasks.map(renderTask)
          ) : (
            <div className="rounded-xl border border-dashed border-slate-200 p-5 text-center dark:border-slate-700 sm:p-6">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Nenhuma tarefa concluída
              </p>

              <p className="mt-1 text-xs text-slate-400 dark:text-slate-500 sm:text-sm">
                Marque uma tarefa como concluída para vê-la aqui.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default TaskList;
