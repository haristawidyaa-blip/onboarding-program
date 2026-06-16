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
      <div className={`w-full rounded-full bg-emerald-100 ${height} overflow-hidden`}>
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
