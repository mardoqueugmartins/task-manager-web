import { useEffect, useState } from 'react';
import { api } from './services/api';
import type { Task } from './types/Task';
import TaskList from './components/TaskList';


function App() {

  const [tasks, setTasks] = useState<Task[]>([]);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchTask = async () => {
      const response = await api.get('/tasks');
        console.log(response.data)
        setTasks(response.data);
    }

    fetchTask();

}, []);

const handleCreateTask = async () => {
  const response = await api.post(
    '/tasks',
    {
      title,
      description
    }
  );
  setTasks([...tasks, response.data])

  setTitle('');
  setDescription('');
  console.log(response.data)
};


console.log(tasks)

  return (
    <div>
      <h1>Task Manager</h1>
      <p>Total de tarefas: {tasks.length}</p>
      <label> Titulo:</label>
      <input type="text" value={title} onChange={(event) => {
        setTitle(event.target.value);
      }}/>
      <label> Descrição:</label>
      <input type="text" value={description} onChange={(event) => {
        setDescription(event.target.value);
      }} />
      <button onClick={handleCreateTask}>Criar Tarefa</button>
     <TaskList tasks={tasks} />
    </div>
  );
}

export default App
