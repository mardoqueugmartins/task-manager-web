import type {Task} from '../types/Task';

type TaskCardProps = {
    task: Task;

    handleDeleteTask: (id: number) => void;
};

const TaskCard = ({task, handleDeleteTask}: TaskCardProps) => {
  return (
    <div>
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <button onClick={() => {
        handleDeleteTask(task.id)
      }}>Excluir tarefa</button>
    </div>
  )
}

export default TaskCard
