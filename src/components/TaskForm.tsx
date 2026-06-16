type TaskFormProps = {
  title: string;
  description: string;

  setTitle: (value: string) => void;
  setDescription: (value: string) => void;

  handleCreateTask: () => void;
};

const TaskForm = ({title, description, setTitle, setDescription, handleCreateTask}: TaskFormProps) => {
  return (
    <div>
      <label> Titulo:</label>
      <input type="text" value={title} onChange={(event) => {
        setTitle(event.target.value);
      }}/>
      <label> Descrição:</label>
      <input type="text" value={description} onChange={(event) => {
        setDescription(event.target.value);
      }} />
      <button onClick={handleCreateTask}>Criar Tarefa</button>
    </div>
  )
}

export default TaskForm
