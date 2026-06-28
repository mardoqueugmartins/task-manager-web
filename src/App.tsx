import { useEffect, useState } from "react";
import { api } from "./services/api";
import type { Task } from "./types/Task";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import StatCard from "./components/StatCard";
import Sidebar from "./components/Layout/Sidebar";
import { ClipboardList, CheckCircle2, Clock, Moon } from "lucide-react";
import { useTheme } from "./hooks/useTheme";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const { theme, toggleTheme } = useTheme();

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

  const handleEditTask = (task: Task) => {
    setEditingTaskId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description);
  };

  const handleUpdateTask = async () => {
    if (!editingTaskId) return;

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

  const pendingFilteredTasks = filteredTasks.filter((task) => !task.completed);
  const completedFilteredTasks = filteredTasks.filter((task) => task.completed);

  const activeFilterButton =
    "rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700";

  const inactiveFilterButton =
    "rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50";

  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      <Sidebar />

      <main className="flex-1 overflow-y-auto px-8 py-8 lg:px-12">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-10">
          <section className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="mb-2 text-sm font-medium text-blue-600">
                Dashboard de tarefas
              </p>

              <h1 className="text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
                Bom dia, Mardoqueu 👋
              </h1>

              <p className="mt-3 max-w-2xl text-slate-500">
                Acompanhe suas tarefas, filtre prioridades e mantenha sua rotina
                mais organizada.
              </p>
            </div>

            <button
              onClick={toggleTheme}
              className="flex w-fit items-center gap-3 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 shadow-md transition hover:bg-slate-50 hover:shadow-lg"
            >
              <Moon size={18} />
              <span>{theme === "light" ? "Modo escuro" : "Modo claro"}</span>
            </button>
          </section>

          <section className="grid gap-6 md:grid-cols-3">
            <StatCard
              title="Total"
              value={tasks.length}
              color="text-blue-600"
              bgColor="bg-blue-100"
              icon={ClipboardList}
            />

            <StatCard
              title="Concluídas"
              value={completedTasks}
              color="text-green-600"
              bgColor="bg-green-100"
              icon={CheckCircle2}
            />

            <StatCard
              title="Pendentes"
              value={pendingTasks}
              color="text-orange-500"
              bgColor="bg-orange-100"
              icon={Clock}
            />
          </section>

          <section className="grid gap-4 lg:grid-cols-[1fr_auto]">
            <input
              className="w-full rounded-xl border border-slate-200 bg-white px-5 py-3 outline-none shadow-sm transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              type="text"
              placeholder="Buscar tarefas..."
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
              }}
            />

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilter("all")}
                className={
                  filter === "all" ? activeFilterButton : inactiveFilterButton
                }
              >
                Todas
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
            </div>
          </section>

          <TaskForm
            title={title}
            description={description}
            setTitle={setTitle}
            setDescription={setDescription}
            handleCreateTask={handleCreateTask}
          />

          <TaskList
            pendingTasks={pendingFilteredTasks}
            completedTasks={completedFilteredTasks}
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
      </main>
    </div>
  );
}

export default App;
