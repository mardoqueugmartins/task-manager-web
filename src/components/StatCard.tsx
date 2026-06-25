type StatCardProps = {
    title: string;
    value: number;
    color: string;
};

const StatCard = ({title, value, color}: StatCardProps) => {
    return (
      <div className="rounded-lg bg-white p-4 shadow-sm">
        <h2 className={`text-2xl font-bold ${color}`}>{value}</h2>
        <p className="text-slate-500">{title}</p>
      </div>
    );
};

export default StatCard