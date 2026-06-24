import type { Task } from '../types/Task';
import TaskCard from './TaskCard';

type TaskListProps = {
  tasks: Task[];

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

const TaskList = ({tasks, handleDeleteTask, handleEditTask, editingTaskId, editTitle, editDescription, setEditTitle, setEditDescription, handleUpdateTask, handleCancelEdit, handleToggleTask}: TaskListProps) => {
  return (
    <div>
      {tasks.map(task => (
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
        
      ))}
    </div>
  )
}

export default TaskList
