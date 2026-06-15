import type { Task } from '../types/Task';
import TaskCard from './TaskCard';

type TaskListProps = {
    tasks: Task[];
};

const TaskList = ({tasks}: TaskListProps) => {
  return (
    <div>
      {tasks.map(task => (
        <TaskCard
        key={task.id}
        task={task}
        />
      ))}
    </div>
  )
}

export default TaskList
