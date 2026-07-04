import type { Track } from "@/lib/mock-data";
import { TRACK_LABELS } from "@/lib/mock-data";

export function TrackBadge({ track, size = "sm" }: { track: Track; size?: "sm" | "xs" }) {
  const isGreen = track === "green";
  const dot = isGreen ? "bg-track-green" : "bg-track-amber";
  const bg = isGreen ? "bg-track-green-soft" : "bg-track-amber-soft";
  const text = isGreen ? "text-track-green" : "text-track-amber";
  const pad = size === "xs" ? "px-1.5 py-0.5 text-[10px]" : "px-2 py-0.5 text-[11px]";
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full font-medium ${bg} ${text} ${pad}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      Trilha {TRACK_LABELS[track]}
    </span>
  );
}
