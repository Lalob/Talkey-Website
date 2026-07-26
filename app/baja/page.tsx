import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MailX } from "lucide-react";
import { LegalFooter } from "@/components/legal-footer";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Suspender comunicaciones comerciales",
  description: "Solicita dejar de recibir comunicaciones comerciales de Talkey.",
  alternates: {
    canonical: absoluteUrl("/baja"),
  },
  robots: {
    index: false,
    follow: true,
  },
};

const unsubscribeUrl =
  "mailto:contact@talkeyco.com?subject=Solicitud%20de%20baja%20de%20comunicaciones%20comerciales&body=Solicito%20dejar%20de%20recibir%20comunicaciones%20comerciales%20de%20Talkey.";

export default function UnsubscribePage() {
  const currentYear = new Date().getUTCFullYear();

  return (
    <main className="mk-site mk-support-page">
      <header className="mk-header">
        <nav className="mk-container mk-nav" aria-label="Navegación legal">
          <Link className="mk-brand" href="/" aria-label="Volver al inicio de Talkey">
            <Image src="/brand/talkey-key.svg" width={76} height={36} alt="" />
            <Image src="/brand/talkey-wordmark.svg" width={116} height={36} alt="Talkey" />
          </Link>
          <div className="mk-nav-links">
            <Link href="/">Inicio</Link>
            <Link href="/privacidad">Política de privacidad</Link>
          </div>
        </nav>
      </header>

      <section className="mk-section mk-contact">
        <div className="mk-container mk-contact-grid">
          <div className="mk-contact-copy">
            <div className="mk-section-label"><span>Legal</span>Comunicaciones</div>
            <h1>Dejar de recibir emails de Talkey</h1>
            <p>
              Puedes solicitar la suspensión de comunicaciones comerciales en cualquier momento. También puedes
              responder al email recibido escribiendo <strong>BAJA</strong>.
            </p>
          </div>

          <div className="mk-privacy-data-note">
            <div className="mk-privacy-icon"><MailX size={20} /></div>
            <div>
              <h2>Solicitar la baja</h2>
              <p>
                Envía la solicitud desde la dirección que deseas excluir. Al recibirla, registraremos la baja para
                impedir futuros envíos promocionales a esa dirección.
              </p>
              <a className="mk-button mk-button-primary" href={unsubscribeUrl}>
                Enviar solicitud de baja <ArrowRight size={18} />
              </a>
              <p>
                Alternativamente, escribe a <a href="mailto:contact@talkeyco.com">contact@talkeyco.com</a>.
              </p>
            </div>
          </div>
        </div>
      </section>

      <LegalFooter currentYear={currentYear} />
    </main>
  );
}
