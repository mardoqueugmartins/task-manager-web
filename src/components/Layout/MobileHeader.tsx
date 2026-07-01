import { Menu, CheckSquare } from "lucide-react";

type MobileHeaderProps = {
  onOpenMenu: () => void;
};

const MobileHeader = ({ onOpenMenu }: MobileHeaderProps) => {
  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-900 lg:hidden">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
          <CheckSquare size={22} />
        </div>

        <div>
          <h1 className="font-bold text-slate-900 dark:text-slate-100">
            Task Manager
          </h1>

          <p className="text-xs text-slate-400">Dashboard</p>
        </div>
      </div>

      <button
        onClick={onOpenMenu}
        className="rounded-xl border border-slate-200 p-2 transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
      >
        <Menu size={22} />
      </button>
    </header>
  );
};

export default MobileHeader;
