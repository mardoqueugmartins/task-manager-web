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

  useEffect(() => {
    const fetchTask = async () => {
      const response = await api.get("/tasks");
      console.log(response.data);
      setTasks(response.data);
    };

    fetchTask();
  }, []);

  const handleCreateTask = async () => {
    try {
      const response = await api.post("/tasks", {
        title,
        description,
        completed: false,
      });

      setTasks([...tasks, response.data]);

      setTitle("");
      setDescription("");
    } catch (error) {
      console.log(error);
      alert("Erro ao criar tarefa.");
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      await api.delete(`/tasks/${id}`);

      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.log(error);
      alert("Erro ao excluir tarefa.");
    }
  };

  const handleUpdateTask = async () => {
    try {
      await api.put(`/tasks/${editingTaskId}`, {
        title: editTitle,
        description: editDescription,
      });

      setTasks(
        tasks.map((task) =>
          task.id === editingTaskId
            ? {
                ...task,
                title: editTitle,
                description: editDescription,
              }
            : task,
        ),
      );

      setEditingTaskId(null);
    } catch (error) {
      console.log(error);
      alert("Erro ao atualizar tarefa.");
    }
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
  };

  const handleToggleTask = async (id: number) => {
    console.log("Clique detectado para a tarefa:", id);
    const taskToggle = tasks.find((task) => task.id === id);

    if (!taskToggle) return;

    try {
      await api.patch(`/tasks/${id}`, {
        completed: !taskToggle.completed,
      });

      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task,
        ),
      );
    } catch (error) {
      console.log(error);
      alert("Erro ao atualizar o status da tarefa.");
    }
  };

  const completedTasks = tasks.filter((task) => task.completed).length;

  const pendingTasks = tasks.filter((task) => !task.completed).length;

  const [filter, setFilter] = useState("all");

  let filteredTasks = tasks;

  if (filter === "completed") {
    filteredTasks = tasks.filter((task) => task.completed);
  }

  if (filter === "pending") {
    filteredTasks = tasks.filter((task) => !task.completed);
  }

  return (
    <div>
      <h1>Task Manager</h1>
      <p>Total de tarefas: {tasks.length}</p>
      <p>Concluídas: {completedTasks}</p>
      <p>Pendentes: {pendingTasks}</p>
      <button onClick={() => setFilter("all")}>Todas</button>

      <button onClick={() => setFilter("completed")}>Concluídas</button>

      <button onClick={() => setFilter("pending")}>Pendentes</button>

      <TaskForm
        title={title}
        description={description}
        setTitle={setTitle}
        setDescription={setDescription}
        handleCreateTask={handleCreateTask}
      />

      <TaskList
        tasks={filteredTasks}
        handleDeleteTask={handleDeleteTask}
        handleEditTask={handleEditTask}
        editingTaskId={editingTaskId}
        editTitle={editTitle}
        editDescription={editDescription}
        setEditTitle={setEditTitle}
        setEditDescription={setEditDescription}
        handleUpdateTask={handleUpdateTask}
        handleCancelEdit={handleCancelEdit}
        handleToggleTask={handleToggleTask}
      />
    </div>
  );
}

export default App;
