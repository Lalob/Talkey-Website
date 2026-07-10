"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./ClimaxPage.module.css";

type ClimaxMenuProps = {
  active?: "inicio" | "productos";
  standalone?: boolean;
};

function buildNavItems(standalone: boolean) {
  const root = standalone ? "/" : "/climax";
  const products = standalone ? "/productos" : "/climax/productos";

  return [
    { href: `${root}#inicio`, label: "Inicio", key: "inicio" },
    { href: `${root}#direccion`, label: "Dirección", key: "direccion" },
    { href: `${root}#sistemas`, label: "Sistemas", key: "sistemas" },
    { href: products, label: "Productos", key: "productos" },
    { href: `${root}#precision`, label: "Precisión", key: "precision" },
    { href: `${root}#contacto`, label: "Contacto", key: "contacto" },
  ];
}

export function ClimaxMenu({ active = "inicio", standalone = false }: ClimaxMenuProps) {
  const [open, setOpen] = useState(false);
  const rootHref = standalone ? "/#inicio" : "/climax#inicio";
  const navItems = buildNavItems(standalone);

  return (
    <header className={`${styles.siteHeader} ${styles.reveal} ${open ? styles.menuOpen : ""}`} data-climax-reveal="down">
      <Link className={styles.brandMark} href={rootHref} aria-label="Climax inicio">
        <span className={styles.brandGlyph}>C</span>
        <span>CLIMAX</span>
      </Link>
      <button
        className={styles.menuToggle}
        type="button"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <span />
        <span />
      </button>
      <nav className={styles.siteNav} aria-label="Menú Climax">
        {navItems.map((item) => (
          <Link
            href={item.href}
            aria-current={active === item.key ? "page" : undefined}
            key={item.key}
            onClick={() => setOpen(false)}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
