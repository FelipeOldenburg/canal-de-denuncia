import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  SECTORS,
  computeAlertStatus,
  explainAlert,
  type SectorMetrics,
} from "@/lib/mock-data";
import { PageHeader } from "@/components/speak/PageHeader";
import { useSettings } from "@/lib/settings";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";

export const Route = createFileRoute("/_app/termometro")({
  component: TermometroPage,
});

const alertMeta = {
  orange: { label: "Alerta Laranja", cls: "bg-alert-orange-soft text-alert-orange border-alert-orange/40" },
  undefined: { label: "Indefinido", cls: "bg-muted text-muted-foreground border-border" },
  none: { label: "Sem alerta", cls: "bg-track-green-soft text-track-green border-track-green/40" },
} as const;

function TermometroPage() {
  const { settings } = useSettings();
  const [openSector, setOpenSector] = useState<SectorMetrics | null>(null);

  const { visible, othersGroup } = useMemo(() => {
    const visible: SectorMetrics[] = [];
    const others: SectorMetrics[] = [];
    for (const s of SECTORS) {
      if (s.headcount >= settings.thermometerMinSample) visible.push(s);
      else others.push(s);
    }
    let othersGroup: SectorMetrics | null = null;
    if (others.length) {
      const headcount = others.reduce((a, b) => a + b.headcount, 0);
      const reports6m = others.reduce((a, b) => a + b.reports6m, 0);
      const turnover = Math.round(others.reduce((a, b) => a + b.turnover, 0) / others.length);
      const climate = Math.round((others.reduce((a, b) => a + b.climate, 0) / others.length) * 10) / 10;
      othersGroup = { sector: "Outros setores (< amostra mínima)", headcount, reports6m, turnover, climate };
    }
    return { visible, othersGroup };
  }, [settings.thermometerMinSample]);

  const rows = othersGroup ? [...visible, othersGroup] : visible;

  return (
    <div className="flex flex-col">
      <PageHeader
        title="Termômetro Setorial"
        subtitle={`Setores com menos de ${settings.thermometerMinSample} colaboradores são agrupados para preservar o anonimato.`}
      />

      <div className="px-6 py-6">
        <div className="rounded-lg border border-border bg-card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground bg-muted/40">
                <th className="px-4 py-3 font-medium">Setor</th>
                <th className="px-4 py-3 font-medium text-right">Denúncias (6m)</th>
                <th className="px-4 py-3 font-medium text-right">Turnover</th>
                <th className="px-4 py-3 font-medium text-right">Clima (1-5)</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((s) => {
                const isGroup = s.sector.startsWith("Outros");
                const status = isGroup ? "undefined" : computeAlertStatus(s);
                const meta = alertMeta[status];
                return (
                  <tr
                    key={s.sector}
                    className="hover:bg-muted/40 cursor-pointer"
                    onClick={() => setOpenSector(s)}
                  >
                    <td className="px-4 py-3">
                      <div className="font-medium">{s.sector}</div>
                      <div className="text-xs text-muted-foreground">{s.headcount} colaboradores</div>
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums">{s.reports6m}</td>
                    <td className="px-4 py-3 text-right tabular-nums">{s.turnover}%</td>
                    <td className="px-4 py-3 text-right tabular-nums">{s.climate.toFixed(1)}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-medium ${meta.cls}`}>
                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                        {meta.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <p className="mt-3 text-xs text-muted-foreground">
          O agrupamento evita a reidentificação de denunciantes em setores pequenos e é ajustável em Configurações.
        </p>
      </div>

      <Sheet open={!!openSector} onOpenChange={(o) => !o && setOpenSector(null)}>
        <SheetContent side="right" className="w-full sm:max-w-md">
          {openSector && (
            <>
              <SheetHeader>
                <SheetTitle>{openSector.sector}</SheetTitle>
                <SheetDescription>{openSector.headcount} colaboradores</SheetDescription>
              </SheetHeader>
              <div className="mt-5 grid grid-cols-3 gap-3">
                <Stat label="Denúncias 6m" value={String(openSector.reports6m)} />
                <Stat label="Turnover" value={`${openSector.turnover}%`} />
                <Stat label="Clima" value={openSector.climate.toFixed(1)} />
              </div>
              <div className="mt-5">
                <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Por que este status?
                </h4>
                <p className="mt-2 text-sm text-foreground/90 leading-relaxed">
                  {openSector.sector.startsWith("Outros")
                    ? "Agrupamento por amostra insuficiente. Não é possível calcular um status individual sem risco de reidentificar denunciantes."
                    : explainAlert(openSector)}
                </p>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-border bg-card p-3">
      <div className="text-[11px] text-muted-foreground uppercase tracking-wide">{label}</div>
      <div className="mt-1 text-lg font-semibold tabular-nums">{value}</div>
    </div>
  );
}
