// Formulář: jen e-mail + nepovinný (nezaškrtnutý) souhlas s novinkami. Po úspěchu přejde na stránku přehledu s tokenem.
// Klíč idempotence brání dvojímu uložení při dvojkliku; honeypot (skryté pole) odfiltruje boty.
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { getAttribution, getSessionId, setLeadId, track } from "@/lib/track";

export default function LeadForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "error" | "bad_email" | "limit">("idle");
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
      if (res.status === 400) return setStatus("bad_email");
      if (res.status === 429) return setStatus("limit");
      if (!res.ok) throw new Error(String(res.status));
      const data = await res.json();
      if (data.lead_id) setLeadId(data.lead_id);
      if (!data.token) throw new Error("bez tokenu");
      router.push(`/prehled?t=${encodeURIComponent(data.token)}`);
    } catch {
      setStatus("error");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="-mx-3 flex flex-col rounded-lg border border-form-line bg-form px-[11px] pb-4 pt-5"
    >
      <h2 className="text-[28px] leading-8 tracking-[-0.65px] max-[374px]:text-2xl">
        Celý přehled zdarma
        <br />
        za e-mail
      </h2>
      <ul className="mt-3 list-disc pl-4 text-[13px] leading-[17px] text-muted marker:text-subtle">
        <li>ISIN UCITS alternativ ke zkopírování do vyhledávání u brokera</li>
        <li>odkazy na české KID a data dokumentů</li>
        <li>kontrolní seznam: jak si ETF ověřit u svého brokera</li>
        <li>KID, PRIIPs a UCITS vysvětlené lidsky</li>
      </ul>
      <label className="mt-4 flex flex-col gap-1">
        <span className="text-xs font-medium">E-mail</span>
        <input
          type="email"
          name="email"
          autoComplete="email"
          inputMode="email"
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
          className="h-11 rounded-box border border-field-line bg-background px-3 text-sm placeholder:text-subtle"
        />
      </label>
      {/* Honeypot: skryté pole pro boty, člověk ho nevidí ani na něj nedojde tabulátorem. */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <label className="mt-1 flex min-h-11 items-center gap-2 text-xs text-muted">
        <input
          type="checkbox"
          className="zaskrtavatko"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
        />
        Chci občas dostat novinky o ETF (nepovinné)
      </label>
      <button
        type="submit"
        disabled={status === "sending"}
        className="flex h-11 items-center justify-center rounded-[5px] bg-accent text-[13px] font-semibold text-accent-foreground disabled:opacity-60"
      >
        {status === "sending" ? "Odesílám..." : "Získat přehled zdarma"}
      </button>
      <p className="mt-3 text-xs font-medium leading-[15px]">Přehled se otevře hned po odeslání.</p>
      <p className="mt-3 text-[13px] leading-[17px] text-muted">
        Odesláním potvrzuješ, že ses seznámil/a se{" "}
        <Link href="/zasady" target="_blank" className="text-accent underline">
          zásadami zpracování
        </Link>
        . E-mail uložíme jako kontakt k tomuto přehledu.
      </p>
      {status === "error" && (
        <p role="alert" className="mt-3 text-sm text-danger">
          Nepodařilo se odeslat. Zkus to prosím znovu.
        </p>
      )}
      {status === "bad_email" && (
        <p role="alert" className="mt-3 text-sm text-danger">
          Zkontroluj prosím e-mailovou adresu.
        </p>
      )}
      {status === "limit" && (
        <p role="alert" className="mt-3 text-sm text-danger">
          Příliš mnoho pokusů. Zkus to prosím za chvíli.
        </p>
      )}
    </form>
  );
}
