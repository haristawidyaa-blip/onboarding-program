export function ProgressBar({
  value,
  total,
  size = "md",
}: {
  value: number;
  total: number;
  size?: "sm" | "md";
}) {
  const pct = total === 0 ? 0 : Math.round((value / total) * 100);
  const height = size === "sm" ? "h-1.5" : "h-2.5";

  return (
    <div className="w-full">
      <div className={`w-full rounded-full bg-red-100 dark:bg-white/10 ${height} overflow-hidden`}>
        <div
          className="h-full rounded-full bg-red-600 transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
