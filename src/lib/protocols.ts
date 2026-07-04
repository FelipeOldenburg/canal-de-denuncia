import { PROTOCOLS, type Protocol } from "./mock-data";

export async function fetchProtocols(): Promise<Protocol[]> {
  const response = await fetch("/api/protocols");
  if (!response.ok) return PROTOCOLS;
  const payload = (await response.json()) as { protocols?: Protocol[] };
  return Array.isArray(payload.protocols) ? payload.protocols : PROTOCOLS;
}
