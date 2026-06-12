import type {Task} from '../types/Task';

type TaskCardProps = {
    task: Task;
};

const TaskCard = ({task}: TaskCardProps) => {
  return (
    <div>
      <h2>{task.title}</h2>
      <p>{task.description}</p>
    </div>
  )
}

export default TaskCard
