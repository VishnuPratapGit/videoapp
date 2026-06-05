interface StatsCardProps {
  label: string;
  value: string;
  delta: string;
  deltaType?: "positive" | "negative" | "neutral";
}

const deltaStyles = {
  positive: "text-green-500",
  negative: "text-red-500",
  neutral: "text-slate-500",
} as const;

export function StatsCard({
  label,
  value,
  delta,
  deltaType = "positive",
}: StatsCardProps) {
  return (
    <div className="flex flex-col min-w-75 p-4 bg-(--surface-muted) border border-(--border-fade) rounded-xl">
      <h1 className="text-(--muted) tracking-widest mb-1.5">{label}</h1>
      <p className="text-xl font-bold text-(--foreground) leading-tight">
        {value}
      </p>
      <p className={`${deltaStyles[deltaType]} text-sm font-mono mt-2`}>
        {delta}
      </p>
    </div>
  );
}

export default StatsCard;
