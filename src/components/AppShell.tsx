import { Link, useRouterState, Outlet, useNavigate } from "@tanstack/react-router";
import {
  LayoutDashboard,
  KanbanSquare,
  Thermometer,
  FileBarChart,
  Settings,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import { useAuth, canManageSettings, ROLE_LABELS } from "@/lib/auth";
import { Button } from "@/components/ui/button";

const NAV = [
  { to: "/painel", label: "Painel", icon: LayoutDashboard },
  { to: "/kanban", label: "Kanban de Protocolos", icon: KanbanSquare },
  { to: "/termometro", label: "Termômetro Setorial", icon: Thermometer },
  { to: "/relatorios", label: "Relatórios e Auditoria", icon: FileBarChart },
] as const;

export function AppShell() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate({ to: "/login" });
  };

  return (
    <div className="flex min-h-dvh bg-background">
      <aside className="hidden md:flex w-64 shrink-0 flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
        <div className="px-5 py-5 border-b border-sidebar-border flex items-center gap-2">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-sidebar-accent">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <div className="text-sm font-semibold tracking-tight">Speak</div>
            <div className="text-[11px] text-sidebar-foreground/70 truncate">Canal Interno · RH & Compliance</div>
          </div>
        </div>

        <nav className="flex-1 px-2 py-3 space-y-0.5">
          {NAV.map((item) => {
            const active = pathname.startsWith(item.to);
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
          {canManageSettings(user.role) && (
            <Link
              to="/configuracoes"
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                pathname.startsWith("/configuracoes")
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60"
              }`}
            >
              <Settings className="h-4 w-4 shrink-0" />
              <span className="truncate">Configurações</span>
            </Link>
          )}
        </nav>

        <div className="border-t border-sidebar-border px-3 py-3">
          <div className="px-2 pb-2">
            <div className="text-sm font-medium truncate">{user.name}</div>
            <div className="text-[11px] text-sidebar-foreground/70 truncate">
              {ROLE_LABELS[user.role]}
              {user.sector ? ` · ${user.sector}` : ""}
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" /> Sair
          </Button>
        </div>
      </aside>

      <main className="flex-1 min-w-0">
        <Outlet />
      </main>
    </div>
  );
}
