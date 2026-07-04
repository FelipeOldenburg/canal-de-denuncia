import type { ReactNode } from "react";

export function PageHeader({
  title,
  subtitle,
  right,
}: {
  title: string;
  subtitle?: string;
  right?: ReactNode;
}) {
  return (
    <header className="px-6 pt-6 pb-5 border-b border-border bg-background sticky top-0 z-10">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
        <div className="min-w-0">
          <h1 className="text-xl font-semibold tracking-tight truncate">{title}</h1>
          {subtitle && (
            <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
        {right && <div className="shrink-0 flex items-center gap-2">{right}</div>}
      </div>
    </header>
  );
}
