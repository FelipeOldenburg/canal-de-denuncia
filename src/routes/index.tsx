import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { user, hydrated } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!hydrated) return;
    navigate({ to: user ? "/painel" : "/login", replace: true });
  }, [hydrated, user, navigate]);
  return null;
}
