import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/qr-whatsapp")({
  component: WhatsAppQrPage,
});

const starterText = "1";

function WhatsAppQrPage() {
  const phone = (import.meta.env.VITE_WHATSAPP_PHONE_NUMBER ?? "").replace(/\D/g, "");
  const whatsappUrl = phone ? `https://wa.me/${phone}?text=${encodeURIComponent(starterText)}` : "";
  const qrUrl = whatsappUrl
    ? `https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=${encodeURIComponent(whatsappUrl)}`
    : "";

  return (
    <main className="min-h-dvh bg-background px-4 py-8 text-foreground">
      <div className="mx-auto flex min-h-[calc(100dvh-4rem)] max-w-md flex-col items-center justify-center gap-6">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-primary text-primary-foreground">
            <ShieldCheck className="h-5 w-5" />
          </span>
          Speak
        </div>

        <section className="w-full rounded-lg border border-border bg-card p-5 text-center shadow-sm">
          <h1 className="text-xl font-semibold">Canal de denuncias</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Escaneie o QR Code para iniciar a conversa no WhatsApp.
          </p>

          {qrUrl ? (
            <>
              <img
                src={qrUrl}
                alt="QR Code para abrir o canal de denuncias no WhatsApp"
                className="mx-auto mt-5 h-72 w-72 rounded-md border border-border bg-white p-3"
              />
              <Button asChild className="mt-5 w-full">
                <a href={whatsappUrl} target="_blank" rel="noreferrer">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Abrir WhatsApp
                </a>
              </Button>
            </>
          ) : (
            <div className="mt-5 rounded-md border border-border bg-muted p-4 text-sm text-muted-foreground">
              Configure VITE_WHATSAPP_PHONE_NUMBER na Vercel para gerar o QR Code.
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
