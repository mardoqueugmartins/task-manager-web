import type { Task } from '../types/Task';
import TaskCard from './TaskCard';

type TaskListProps = {
    tasks: Task[];

    handleDeleteTask: (id: number) => void;
};

const TaskList = ({tasks, handleDeleteTask}: TaskListProps) => {
  return (
    <div>
      {tasks.map(task => (
        <TaskCard
        key={task.id}
        task={task}
        handleDeleteTask={handleDeleteTask}
        />
      ))}
    </div>
  )
}

export default TaskList
