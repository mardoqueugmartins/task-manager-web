import type { LucideIcon } from "lucide-react";

type StatCardProps = {
  title: string;
  value: number;
  color: string;
  bgColor: string;
  icon: LucideIcon;
};

const StatCard = ({
  title,
  value,
  color,
  bgColor,
  icon: Icon,
}: StatCardProps) => {
  return (
    <div className="flex min-h-24 w-50 shrink-0 items-center gap-5 rounded-2xl border border-slate-200 bg-white p-4 lg:p-6 shadow-sm transition hover:shadow-md dark:border-slate-700 dark:bg-slate-800 lg:min-h-28 lg:w-auto">
      <div
        className={`flex h-12 w-12 lg:h-16 lg:w-16 items-center justify-center rounded-2xl ${bgColor}`}
      >
        <Icon className={color} size={30} strokeWidth={2.2} />
      </div>

      <div>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
          {title}
        </p>

        <h2 className={`text-2xl lg:text-4xl font-bold ${color}`}>{value}</h2>

        <p className="text-xs lg:text-sm text-slate-400 dark:text-slate-500">tarefas</p>
      </div>
    </div>
  );
};

export default StatCard;
