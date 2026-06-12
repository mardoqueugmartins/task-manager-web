import { useEffect, useState } from 'react';
import { api } from './services/api';
import type { Task } from './types/Task';
import TaskCard from './components/TaskCard';


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
        <TaskCard
        key={task.id}
        task={task}
        />
        ))}
    </div>
  );
}

export default App
