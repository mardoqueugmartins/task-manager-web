import { useEffect, useState } from "react";
import { api } from "./services/api";
import type { Task } from "./types/Task";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchTask = async () => {
      const response = await api.get("/tasks");
      console.log(response.data);
      setTasks(response.data);
    };

    fetchTask();
  }, []);

  const handleCreateTask = async () => {
    const response = await api.post("/tasks", {
      title,
      description,
    });
    setTasks([...tasks, response.data]);

    setTitle("");
    setDescription("");
    console.log(response.data);
  };

  const handleDeleteTask = async (id: number) => {
    await api.delete(`/tasks/${id}`);

    setTasks(
      tasks.filter(task => task.id !== id)
    );
  };

  console.log(tasks);

  return (
    <div>
      <h1>Task Manager</h1>
      <p>Total de tarefas: {tasks.length}</p>

      <TaskForm
        title={title}
        description={description}
        setTitle={setTitle}
        setDescription={setDescription}
        handleCreateTask={handleCreateTask}
      />

      <TaskList
      tasks={tasks}
      handleDeleteTask={handleDeleteTask}
      />
    </div>
  );
}

export default App;
