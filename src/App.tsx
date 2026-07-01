import { useEffect, useState } from "react";
import { api } from "./services/api";
import type { Task } from "./types/Task";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import StatCard from "./components/StatCard";
import Sidebar from "./components/Layout/Sidebar";
import { ClipboardList, CheckCircle2, Clock, Moon, Search } from "lucide-react";
import { useTheme } from "./hooks/useTheme";
import MobileHeader from "./components/Layout/MobileHeader";
import MobileDrawer from "./components/Layout/MobileDrawer";
import { Toaster, toast } from "sonner";
import DeleteTaskModal from "./components/DeleteTaskModal";


function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [isCreatingTask, setIsCreatingTask] = useState(false);
  const [updatingTaskId, setUpdatingTaskId] = useState<number | null>(null);
  const [deletingTaskId, setDeletingTaskId] = useState<number | null>(null);
  const [togglingTaskId, setTogglingTaskId] = useState<number | null>(null);

  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await api.get("/tasks");
        setTasks(response.data);
      } catch (error) {
        console.log(error);
        toast.error("Erro ao carregar tarefas.");
      }
    };

    fetchTask();
  }, []);

  const handleCreateTask = async () => {
    if (!title.trim()) {
      toast.error("Informe o título da tarefa.");
      return;
    }

    try {
      setIsCreatingTask(true);

      const response = await api.post("/tasks", {
        title,
        description,
        completed: false,
      });

      setTasks([...tasks, response.data]);
      setTitle("");
      setDescription("");

      toast.success("Tarefa criada com sucesso.");
    } catch (error) {
      console.log(error);
      toast.error("Erro ao criar tarefa.");
    } finally {
      setIsCreatingTask(false);
    }
  };

  const handleOpenDeleteModal = (task: Task) => {
    setTaskToDelete(task);
  };

  const handleCloseDeleteModal = () => {
    setTaskToDelete(null);
  };

 const handleDeleteTask = async () => {
   if (!taskToDelete) return;

   try {
     setDeletingTaskId(taskToDelete.id);

     await api.delete(`/tasks/${taskToDelete.id}`);

     setTasks(tasks.filter((task) => task.id !== taskToDelete.id));

     toast.success("Tarefa excluída com sucesso.");
     setTaskToDelete(null);
   } catch (error) {
     console.log(error);
     toast.error("Erro ao excluir tarefa.");
   } finally {
     setDeletingTaskId(null);
   }
 };

  const handleEditTask = (task: Task) => {
    setEditingTaskId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description);
  };

  const handleUpdateTask = async () => {
    if (!editingTaskId) return;

    if (!editTitle.trim()) {
      toast.error("Informe o título da tarefa.");
      return;
    }

    try {
      setUpdatingTaskId(editingTaskId);

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

      toast.success("Tarefa atualizada com sucesso.");
    } catch (error) {
      console.log(error);
      toast.error("Erro ao atualizar tarefa.");
    } finally {
      setUpdatingTaskId(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
  };

 const handleToggleTask = async (id: number) => {
   const taskToggle = tasks.find((task) => task.id === id);

   if (!taskToggle) return;

   try {
     setTogglingTaskId(id);

     await api.patch(`/tasks/${id}`, {
       completed: !taskToggle.completed,
     });

     setTasks(
       tasks.map((task) =>
         task.id === id ? { ...task, completed: !task.completed } : task,
       ),
     );

     toast.success(
       taskToggle.completed
         ? "Tarefa marcada como pendente."
         : "Tarefa concluída com sucesso.",
     );
   } catch (error) {
     console.log(error);
     toast.error("Erro ao atualizar o status da tarefa.");
   } finally {
     setTogglingTaskId(null);
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
    "rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700";

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 transition-colors duration-300 dark:bg-slate-900 dark:text-slate-100">
      <Toaster richColors position="top-right" />

      <DeleteTaskModal
        task={taskToDelete}
        onClose={handleCloseDeleteModal}
        onConfirm={handleDeleteTask}
        isDeleting={deletingTaskId === taskToDelete?.id}
      />

      <MobileHeader onOpenMenu={() => setIsMobileMenuOpen(true)} />

      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-12 lg:py-8">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 sm:gap-7 lg:gap-8">
            <section className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="mb-2 text-sm font-medium text-blue-600 dark:text-blue-400">
                  Dashboard de tarefas
                </p>

                <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl lg:text-4xl">
                  Bom dia, Mardoqueu 👋
                </h1>

                <p className="mt-3 max-w-2xl text-sm text-slate-500 dark:text-slate-400 sm:text-base">
                  Acompanhe suas tarefas, filtre prioridades e mantenha sua
                  rotina mais organizada.
                </p>
              </div>

              <button
                onClick={toggleTheme}
                className="flex w-full items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 shadow-md transition hover:bg-slate-50 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 sm:w-fit sm:min-w-40"
              >
                <div className="flex items-center gap-3">
                  <Moon size={18} />
                  <span>{theme === "light" ? "Escuro" : "Claro"}</span>
                </div>

                <div
                  className={`flex h-6 w-11 items-center rounded-full p-1 transition-all duration-300 ease-in-out ${
                    theme === "dark" ? "bg-blue-600" : "bg-slate-300"
                  }`}
                >
                  <div
                    className={`h-4 w-4 rounded-full bg-white transition-all duration-300 ease-in-out ${
                      theme === "dark" ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </div>
              </button>
            </section>

            <section className="-mx-4 overflow-x-auto hide-scrollbar px-4 pb-2 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0">
              <div className="flex w-max flex-nowrap gap-4 lg:grid lg:w-full lg:grid-cols-3 lg:gap-6">
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
              </div>
            </section>

            <section className="grid gap-4 lg:grid-cols-[1fr_auto]">
              <div className="relative">
                <Search
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
                />

                <input
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-12 pr-5 text-slate-900 outline-none shadow-sm transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:ring-blue-950"
                  type="text"
                  placeholder="Buscar tarefas..."
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value);
                  }}
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
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
              isCreatingTask={isCreatingTask}
            />

            <TaskList
              pendingTasks={pendingFilteredTasks}
              completedTasks={completedFilteredTasks}
              handleDeleteTask={handleOpenDeleteModal}
              handleEditTask={handleEditTask}
              editingTaskId={editingTaskId}
              editTitle={editTitle}
              editDescription={editDescription}
              setEditTitle={setEditTitle}
              setEditDescription={setEditDescription}
              handleUpdateTask={handleUpdateTask}
              handleCancelEdit={handleCancelEdit}
              handleToggleTask={handleToggleTask}
              updatingTaskId={updatingTaskId}
              deletingTaskId={deletingTaskId}
              togglingTaskId={togglingTaskId}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
