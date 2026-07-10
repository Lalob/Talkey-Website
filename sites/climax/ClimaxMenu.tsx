"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./ClimaxPage.module.css";

type ClimaxMenuProps = {
  active?: "inicio" | "productos";
};

const navItems = [
  { href: "/climax#inicio", label: "Inicio", key: "inicio" },
  { href: "/climax#direccion", label: "Dirección", key: "direccion" },
  { href: "/climax#sistemas", label: "Sistemas", key: "sistemas" },
  { href: "/climax/productos", label: "Productos", key: "productos" },
  { href: "/climax#precision", label: "Precisión", key: "precision" },
  { href: "/climax#contacto", label: "Contacto", key: "contacto" },
];

export function ClimaxMenu({ active = "inicio" }: ClimaxMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className={`${styles.siteHeader} ${styles.reveal} ${open ? styles.menuOpen : ""}`} data-climax-reveal="down">
      <Link className={styles.brandMark} href="/climax#inicio" aria-label="Climax inicio">
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
