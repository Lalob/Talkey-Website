"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useId, useState } from "react";

type MobileSuiteHeaderLabels = {
  home: string;
  manuals: string;
  problem: string;
  comparison: string;
  pricing: string;
};

const defaultLabels: MobileSuiteHeaderLabels = {
  home: "Inicio",
  manuals: "Manuales",
  problem: "Problemas/Soluciones",
  comparison: "Comparación",
  pricing: "Precios",
};

export function MobileSuiteHeader({
  suite,
  labels = defaultLabels,
}: {
  suite: "sales" | "support";
  labels?: MobileSuiteHeaderLabels;
}) {
  const [open, setOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    function closeOnDesktop() {
      if (window.innerWidth > 820) setOpen(false);
    }

    document.addEventListener("keydown", closeOnEscape);
    window.addEventListener("resize", closeOnDesktop);

    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("resize", closeOnDesktop);
    };
  }, [open]);

  const items = [
    { href: "/", label: labels.home },
    { href: "/manuales", label: labels.manuals },
    { href: "#problema", label: labels.problem },
    { href: "#comparacion", label: labels.comparison },
    { href: "#precios", label: labels.pricing },
  ];

  return (
    <header className={`mk-mobile-suite-header mk-mobile-suite-header-${suite}`}>
      <div className="mk-container mk-mobile-suite-header-row">
        <Link className="mk-brand" href="/" aria-label="Ir al inicio de Talkey" onClick={() => setOpen(false)}>
          <Image src="/brand/talkey-key.svg" alt="" width={76} height={36} priority />
          <Image src="/brand/talkey-wordmark.svg" alt="Talkey" width={116} height={36} priority />
        </Link>
        <button
          className="mk-mobile-suite-menu-button"
          type="button"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-controls={menuId}
          aria-expanded={open}
          onClick={() => setOpen((current) => !current)}
        >
          {open ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>
      </div>
      <nav
        id={menuId}
        className={`mk-mobile-suite-nav${open ? " is-open" : ""}`}
        aria-label="Navegación móvil"
        aria-hidden={!open}
      >
        {items.map((item) =>
          item.href.startsWith("#") ? (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ) : (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ),
        )}
      </nav>
      {open ? (
        <button
          className="mk-mobile-suite-backdrop"
          type="button"
          aria-label="Cerrar menú"
          onClick={() => setOpen(false)}
        />
      ) : null}
    </header>
  );
}
