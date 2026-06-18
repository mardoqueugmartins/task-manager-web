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
};

const TaskList = ({tasks, handleDeleteTask, handleEditTask, editingTaskId, editTitle, editDescription, setEditTitle, setEditDescription, handleUpdateTask}: TaskListProps) => {
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
        />
        
      ))}
    </div>
  )
}

export default TaskList
