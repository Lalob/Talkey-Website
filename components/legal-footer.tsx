"use client";

import Link from "next/link";
import { useState } from "react";
import { ANALYTICS_PREFERENCES_EVENT } from "@/lib/analytics";

type LegalTopic = "cookies" | "terms";

type LegalFooterProps = {
  currentYear: number;
};

const legalContent: Record<LegalTopic, { title: string; body: string[] }> = {
  cookies: {
    title: "Política de cookies",
    body: [
      "Talkey puede usar cookies técnicas necesarias para que el sitio funcione correctamente y tecnologías de medición, como analítica web, para entender el uso general del sitio y mejorar la experiencia.",
      "Las cookies de analítica, cuando estén activas, se usan de forma agregada para medir visitas, navegación y rendimiento. No se utilizan para vender datos personales ni para perfilar usuarios de forma invasiva.",
      "La analítica permanece desactivada hasta que das tu consentimiento. Puedes aceptar, rechazar o cambiar tu decisión en cualquier momento mediante el control de cookies del sitio."
    ]
  },
  terms: {
    title: "Términos y condiciones",
    body: [
      "La información publicada en este sitio tiene fines comerciales e informativos. Los precios, alcances, integraciones y tiempos de implementación son referenciales y deben confirmarse en una evaluación técnica y comercial.",
      "Talkey es una solución SaaS B2B. La contratación del servicio, niveles de soporte, tratamiento de datos, responsabilidades e integraciones aplicables se regulan mediante una propuesta, orden de servicio o contrato específico con cada cliente.",
      "El contenido, marcas, textos, diseños y elementos visuales del sitio pertenecen a Talkey o se usan con autorización. No está permitido reproducirlos o reutilizarlos sin consentimiento previo."
    ]
  }
};

export function LegalFooter({ currentYear }: LegalFooterProps) {
  const [activeTopic, setActiveTopic] = useState<LegalTopic | null>(null);
  const activeContent = activeTopic ? legalContent[activeTopic] : null;

  function openCookiePreferences() {
    setActiveTopic(null);
    window.dispatchEvent(new Event(ANALYTICS_PREFERENCES_EVENT));
  }

  return (
    <footer className="mk-footer mk-legal-footer">
      <div className="mk-container mk-footer-bottom mk-legal-footer-bottom">
        <div className="mk-legal-footer-links">
          <Link href="/privacidad">Política de privacidad</Link>
          <button type="button" onClick={() => setActiveTopic("cookies")}>Política de cookies</button>
          <button type="button" onClick={() => setActiveTopic("terms")}>Términos y condiciones</button>
          <a href="mailto:contact@talkeyco.com">contact@talkeyco.com</a>
        </div>
        <span>© {currentYear} Talkey</span>
      </div>

      {activeContent ? (
        <div className="mk-legal-modal-backdrop" role="presentation" onClick={() => setActiveTopic(null)}>
          <section
            className="mk-legal-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mk-legal-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div>
              <p>Información legal</p>
              <h2 id="mk-legal-modal-title">{activeContent.title}</h2>
            </div>
            {activeContent.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {activeTopic === "cookies" ? (
              <button type="button" onClick={openCookiePreferences}>Configurar cookies</button>
            ) : null}
            <button type="button" onClick={() => setActiveTopic(null)}>Cerrar</button>
          </section>
        </div>
      ) : null}
    </footer>
  );
}
