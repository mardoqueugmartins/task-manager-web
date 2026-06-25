import { useEffect, useState } from "react";
import { api } from "./services/api";
import type { Task } from "./types/Task";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import StatCard from "./components/StatCard";

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

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const completedTasks = tasks.filter((task) => task.completed).length;

  const pendingTasks = tasks.filter((task) => !task.completed).length;

  let filteredTasks = tasks;

  if (filter === "completed") {
    filteredTasks = tasks.filter((task) => task.completed);
  }

  if (filter === "pending") {
    filteredTasks = tasks.filter((task) => !task.completed);
  }

  if (search) {
    filteredTasks = filteredTasks.filter((task) =>
      task.title.toLowerCase().includes(search.toLowerCase()),
    );
  }

  const activeFilterButton = "rounded-lg bg-blue-600 px-4 py-2 text-white";
  const inactiveFilterButton = "rounded-lg bg-slate-100 px-4 py-2 text-slate-700 hover:bg-slate-200";

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10 text-slate-900">
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        <section className="text-center">
          <h1 className="text-4xl font-bold text-blue-600">Task Manager</h1>
          <p className="mt-2 text-slate-600">
            Organize suas tarefas de forma simples
          </p>
        </section>

        <section className="grid grid-cols-3 gap-4 text-center">
          <StatCard title="Total" value={tasks.length} color="text-blue-600" />
          <StatCard
            title="Concluídas"
            value={completedTasks}
            color="text-green-600"
          />
          <StatCard
            title="Pendentes"
            value={pendingTasks}
            color="text-orange-500"
          />
        </section>

        <section className="rounded-lg bg-white p-4 shadow-sm">
          <input
            className="w-full rounded-lg border border-slate-200 px-4 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            type="text"
            placeholder="Buscar tarefas..."
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => setFilter("all")}
              className={
                filter === "all" ? activeFilterButton : inactiveFilterButton
              }
            >
              Todas
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={
                filter === "completed"
                  ? activeFilterButton
                  : inactiveFilterButton
              }
            >
              Concluídas
            </button>
            <button
              onClick={() => setFilter("pending")}
              className={
                filter === "pending"
                  ? activeFilterButton
                  : inactiveFilterButton
              }
            >
              Pendentes
            </button>
          </div>
        </section>

        <section>
          <TaskForm
            title={title}
            description={description}
            setTitle={setTitle}
            setDescription={setDescription}
            handleCreateTask={handleCreateTask}
          />
        </section>

        <section>
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
        </section>
      </div>
    </main>
  );
}

export default App;
