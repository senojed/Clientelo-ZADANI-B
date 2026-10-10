// Formulář: jen e-mail + nepovinný (nezaškrtnutý) souhlas s novinkami. Po úspěchu předá token k přehledu.
// Klíč idempotence brání dvojímu uložení při dvojkliku; honeypot (skryté pole) odfiltruje boty.
"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { getAttribution, getSessionId, setLeadId, track } from "@/lib/track";

export default function LeadForm({ onDone }: { onDone: (token: string) => void }) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const attemptKey = useRef<string | null>(null);
  const started = useRef(false);

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
      if (!data.token) throw new Error("bez tokenu");
      onDone(data.token);
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3 rounded-box border border-line p-5">
      <h2 className="text-2xl font-semibold">Celý přehled zdarma</h2>
      <ul className="list-disc pl-5 text-muted">
        <li>ISIN UCITS alternativ ke zkopírování do vyhledávání u brokera</li>
        <li>odkazy na české KID a data dokumentů</li>
        <li>kontrolní seznam: jak si ETF ověřit u svého brokera</li>
        <li>KID, PRIIPs a UCITS vysvětlené lidsky</li>
      </ul>
      <label className="flex flex-col gap-1">
        <span className="text-sm text-muted">E-mail</span>
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
          className="rounded-box border border-line px-3 py-2"
        />
      </label>
      {/* Honeypot: skryté pole pro boty, člověk ho nevidí ani na něj nedojde tabulátorem. */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <label className="flex gap-2 text-sm">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
        Chci občas dostat novinky o ETF (nepovinné)
      </label>
      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-box bg-accent px-5 py-3 font-medium text-accent-foreground disabled:opacity-60"
      >
        {status === "sending" ? "Odesílám..." : "Získat přehled zdarma"}
      </button>
      <p className="text-sm text-muted">Přehled se zobrazí hned po odeslání.</p>
      <p className="text-xs text-muted">
        Odesláním potvrzuješ, že ses seznámil/a se{" "}
        <Link href="/zasady" className="underline">
          zásadami zpracování
        </Link>
        . E-mail uložíme jako kontakt k tomuto přehledu.
      </p>
      {status === "error" && <p className="text-sm text-red-700">Nepodařilo se odeslat. Zkus to prosím znovu.</p>}
    </form>
  );
}
