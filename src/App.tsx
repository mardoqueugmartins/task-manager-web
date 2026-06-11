import { useEffect, useState } from 'react';
import { api } from './services/api';
import type { Task } from './types/Task';


function App() {

  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTask = async () => {
      const response = await api.get('/tasks');
        console.log(response.data)
        setTasks(response.data);
    }

    fetchTask();

}, []);

console.log(tasks)

  return (
    <div>
      <h1>Task Manager</h1>
      <p>Total de tarefas: {tasks.length}</p>
      {tasks.map(task => (
        <div key={task.id}>
          <h2>{task.title}</h2>
        <p>{task.description}</p>
        </div>
      ))}
    </div>
  );
}

export default App
