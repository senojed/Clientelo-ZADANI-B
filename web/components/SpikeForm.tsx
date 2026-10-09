// Technický test formuláře (spike): ověřuje průchod prohlížeč -> /api/lead -> databáze a měření událostí.
// Vzhled a texty jsou provizorní, finální stránka vznikne až s ověřenými daty.
"use client";

import { useEffect, useRef, useState } from "react";
import { getAttribution, getSessionId, setLeadId, track } from "@/lib/track";

export default function SpikeForm() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  // Jeden klíč na jeden pokus o odeslání: dvojklik pošle stejný klíč a server nic nezdvojí.
  const attemptKey = useRef<string | null>(null);
  const started = useRef(false);

  useEffect(() => {
    track("page_view");
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    if (!attemptKey.current) attemptKey.current = crypto.randomUUID();
    setStatus("sending");
    track("form_submit_attempt");

    const { utm, variant } = getAttribution();
    const website = (e.currentTarget.elements.namedItem("website") as HTMLInputElement).value;
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          marketing_consent: consent,
          idempotency_key: attemptKey.current,
          session_id: getSessionId(),
          utm,
          variant,
          website,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      const data = await res.json();
      if (data.lead_id) setLeadId(data.lead_id);
      setStatus("done");
    } catch {
      setStatus("error");
      // Po chybě necháme stejný klíč, opakování tak lead nezdvojí.
    }
  }

  if (status === "done") {
    return <p className="text-lg">Hotovo, kontakt je uložený. (Tady bude děkovná část se stažením přehledu.)</p>;
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3 max-w-sm">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (!started.current) {
            started.current = true;
            track("form_start");
          }
        }}
        placeholder="tvuj@email.cz"
        className="border rounded px-3 py-2"
      />
      {/* Honeypot: skryté pole pro boty, člověk ho nevidí ani na něj nedojde tabulátorem. */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <label className="flex gap-2 text-sm">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
        Chci občas dostat novinky o ETF (nepovinné)
      </label>
      <button type="submit" disabled={status === "sending"} className="bg-black text-white rounded px-3 py-2">
        Zobrazit celý přehled
      </button>
      <p className="text-xs">E-mail uložíme jako kontakt a hned ti zobrazíme celý přehled.</p>
      {status === "error" && <p className="text-sm text-red-600">Nepodařilo se odeslat. Zkus to znovu.</p>}
    </form>
  );
}
