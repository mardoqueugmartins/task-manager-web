import {
  LayoutDashboard,
  BarChart3,
  Settings,
  CheckSquare,
  UserCircle2,
} from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="hidden min-h-screen w-72 shrink-0 border-r border-slate-200 bg-white px-6 py-8 transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900 lg:flex lg:flex-col">
      <div className="mb-12 flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-sm">
          <CheckSquare size={24} />
        </div>

        <div>
          <h1 className="text-lg font-bold text-slate-900 transition-colors dark:text-slate-100">
            Task Manager
          </h1>
          <p className="text-sm text-slate-400 dark:text-slate-500">
            Dashboard
          </p>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex flex-1 flex-col gap-2">
        <button className="flex items-center gap-3 rounded-xl bg-blue-50 px-4 py-3 font-medium text-blue-600 transition">
          <LayoutDashboard size={20} />
          <span>Tarefas</span>
        </button>

        <button className="flex items-center gap-3 rounded-xl bg-blue-50 px-4 py-3 font-medium text-blue-600 transition dark:bg-blue-950/40 dark:text-blue-300">
          <BarChart3 size={20} />
          <span>Estatísticas</span>
        </button>

        <button className="flex items-center gap-3 rounded-xl px-4 py-3 font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100">
          <Settings size={20} />
          <span>Configurações</span>
        </button>
      </nav>

      <div className="mt-8 flex items-center gap-3 rounded-2xl border border-slate-200 p-4 transition-colors dark:border-slate-700 dark:bg-slate-800">
        <UserCircle2 size={42} className="text-slate-400" />

        <div>
          <p className="font-semibold text-slate-900 dark:text-slate-100">
            Mardoqueu
          </p>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Desenvolvedor
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
