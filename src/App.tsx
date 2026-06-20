import { useEffect, useState } from "react";
import { api } from "./services/api";
import type { Task } from "./types/Task";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);

  const handleEditTask = (task: Task) => {
    setEditingTaskId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description);
  };

  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  console.log(editingTaskId);
  
  console.log({
    editTitle,
    editDescription
  });

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

  const handleUpdateTask = async () => {
    console.log("Salvando...");
   const response = await api.put(`/tasks/${editingTaskId}`, {
     title: editTitle,
     description: editDescription,
   });

   console.log("Response completo:");
   console.log(response);

   console.log("Response data:");
   console.log(response.data);
    

    setTasks(tasks.map(task =>
      task.id === editingTaskId
      ? {
        ...task,
        title: editTitle,
        description: editDescription,
      }
      : task
    ));

    setEditingTaskId(null);
  };


  const handleCancelEdit = () => {
    setEditingTaskId(null);
  };

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
      handleEditTask={handleEditTask}
      editingTaskId={editingTaskId}
      editTitle={editTitle}
      editDescription={editDescription}
      setEditTitle={setEditTitle}
      setEditDescription={setEditDescription}
      handleUpdateTask={handleUpdateTask}
      handleCancelEdit={handleCancelEdit}
      />
    </div>
  );
}

export default App;
