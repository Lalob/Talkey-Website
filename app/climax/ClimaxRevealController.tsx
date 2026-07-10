"use client";

import { useEffect } from "react";
import styles from "./ClimaxPage.module.css";

export function ClimaxRevealController() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.16 },
    );
    const revealElements = Array.from(document.querySelectorAll<HTMLElement>("[data-climax-reveal]"));
    revealElements.forEach((element) => {
      const revealGroup = element.closest("section, footer, header, main");
      const groupElements = revealGroup
        ? Array.from(revealGroup.querySelectorAll<HTMLElement>("[data-climax-reveal]"))
        : revealElements;
      const groupIndex = Math.max(0, groupElements.indexOf(element));
      element.style.setProperty("--reveal-delay", `${Math.min(groupIndex * 86, 430)}ms`);
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
