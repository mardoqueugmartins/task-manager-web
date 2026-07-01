import {
  LayoutDashboard,
  BarChart3,
  Settings,
  CheckSquare,
  UserCircle2,
  X,
} from "lucide-react";

type MobileDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

const MobileDrawer = ({ isOpen, onClose }: MobileDrawerProps) => {
  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col border-r border-slate-200 bg-white px-6 py-8 transition-transform duration-300 dark:border-slate-800 dark:bg-slate-900 lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-12 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white">
              <CheckSquare size={24} />
            </div>

            <div>
              <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                Task Manager
              </h1>
              <p className="text-sm text-slate-400">Dashboard</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-2">
          <button
            onClick={onClose}
            className="flex items-center gap-3 rounded-xl bg-blue-50 px-4 py-3 font-medium text-blue-600 transition dark:bg-blue-950/40 dark:text-blue-300"
          >
            <LayoutDashboard size={20} />
            <span>Tarefas</span>
          </button>

          <button
            onClick={onClose}
            className="flex items-center gap-3 rounded-xl px-4 py-3 font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
          >
            <BarChart3 size={20} />
            <span>Estatísticas</span>
          </button>

          <button
            onClick={onClose}
            className="flex items-center gap-3 rounded-xl px-4 py-3 font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
          >
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
    </>
  );
};

export default MobileDrawer;
