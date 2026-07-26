import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Database, Globe2, Mail, ShieldCheck, UserRoundCheck } from "lucide-react";
import { LegalFooter } from "@/components/legal-footer";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: "Cómo Talkey trata la información de contacto, agendamiento, navegación y comunicaciones comerciales.",
  alternates: {
    canonical: absoluteUrl("/privacidad"),
  },
};

const privacyItems = [
  {
    icon: Database,
    title: "Datos que podemos tratar",
    text: "Datos de contacto y mensajes que nos entregues, información necesaria para coordinar reuniones, preferencias de comunicación y datos técnicos de navegación cuando aceptas analítica.",
  },
  {
    icon: UserRoundCheck,
    title: "Para qué los utilizamos",
    text: "Responder consultas, preparar evaluaciones, coordinar reuniones, mantener una relación comercial solicitada, proteger el sitio y mejorar su funcionamiento mediante estadísticas agregadas.",
  },
  {
    icon: CalendarDays,
    title: "Agendamiento",
    text: "Las reservas se gestionan mediante Google Calendar. La información que ingreses en ese servicio también queda sujeta a las condiciones y políticas de Google.",
  },
  {
    icon: Globe2,
    title: "Proveedores tecnológicos",
    text: "Podemos utilizar Cloudflare y servicios de Google para alojamiento, seguridad, inteligencia artificial, correo, calendario y analítica. Estos proveedores pueden procesar información fuera de Chile bajo sus propias salvaguardas.",
  },
  {
    icon: ShieldCheck,
    title: "Asistentes con inteligencia artificial",
    text: "Los mensajes enviados a los demos pueden procesarse mediante servicios de inteligencia artificial para generar una respuesta. No ingreses contraseñas, datos financieros, secretos comerciales ni otra información confidencial o sensible.",
  },
  {
    icon: Mail,
    title: "Comunicaciones comerciales",
    text: "Cada comunicación identificará a Talkey y ofrecerá una vía para solicitar su suspensión. Si pides la baja, conservaremos únicamente lo necesario para respetar esa decisión y evitar nuevos envíos.",
  },
  {
    icon: ShieldCheck,
    title: "Tus derechos",
    text: "Puedes solicitar acceso, corrección, eliminación u oposición al tratamiento de tus datos, y retirar una autorización previamente otorgada, escribiendo a contact@talkeyco.com.",
  },
];

export default function PrivacyPage() {
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
            <Link href="/ventas">Ventas</Link>
            <Link href="/soporte">Soporte técnico</Link>
          </div>
        </nav>
      </header>

      <section className="mk-section mk-privacy">
        <div className="mk-container">
          <div className="mk-section-heading mk-privacy-heading">
            <div>
              <div className="mk-section-label"><span>Legal</span>Privacidad</div>
              <h1>Política de privacidad</h1>
            </div>
            <p>
              Esta política explica de manera clara qué información puede tratar Talkey, para qué la usa y cómo
              puedes ejercer tus derechos. Última actualización: 23 de julio de 2026.
            </p>
          </div>

          <div className="mk-privacy-grid">
            {privacyItems.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title}>
                  <div className="mk-privacy-icon"><Icon size={20} /></div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              );
            })}
          </div>

          <div className="mk-privacy-data-note">
            <p>
              <strong>Responsable y contacto:</strong> Talkey, contact@talkeyco.com. No vendemos tus datos
              personales. Conservamos la información solo durante el tiempo necesario para la finalidad que motivó
              su tratamiento, para cumplir obligaciones aplicables o para respetar una solicitud de baja.
            </p>
          </div>
        </div>
      </section>

      <LegalFooter currentYear={currentYear} />
    </main>
  );
}
