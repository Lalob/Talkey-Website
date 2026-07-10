import type { Metadata } from "next";
import Link from "next/link";
import { ClimaxMenu } from "../ClimaxMenu";
import { ClimaxRevealController } from "../ClimaxRevealController";
import styles from "../ClimaxPage.module.css";
import { climaxProducts } from "../climaxProducts";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Productos Climax | ACS y calefacción",
  description:
    "Familias de productos Climax para Agua Caliente Sanitaria (ACS) y calefacción, con usos habituales y datos clave para soporte técnico.",
  alternates: {
    canonical: "https://www.talkeyco.com/climax/productos",
  },
  openGraph: {
    title: "Productos Climax | ACS y calefacción",
    description:
      "Soluciones Climax para Agua Caliente Sanitaria (ACS) y calefacción, con usos habituales y datos clave de soporte.",
    url: "https://www.talkeyco.com/climax/productos",
    siteName: "Climax",
    images: [
      {
        url: "/climax/climax-thermal-system.png",
        width: 1717,
        height: 916,
        alt: "Render conceptual de equipos de climatización Climax",
      },
    ],
    locale: "es_CL",
    type: "website",
  },
};

export default function ClimaxProductsPage() {
  return (
    <div className={`${styles.climaxSite} ${styles.productPage}`}>
      <ClimaxRevealController />
      <ClimaxMenu active="productos" />
      <main>
        <section className={styles.productHero}>
          <div className={styles.reveal} data-climax-reveal="left">
            <p className={styles.eyebrow}>ACS y calefacción</p>
            <h1>Productos Climax</h1>
          </div>
          <p className={styles.reveal} data-climax-reveal="right">
            Soluciones para Agua Caliente Sanitaria (ACS) y calefacción, ordenadas para revisar usos habituales y
            datos clave de soporte técnico.
          </p>
        </section>

        <section className={styles.productCatalog} aria-label="Productos Climax">
          {climaxProducts.map((product, index) => (
            <article
              className={`${styles.productDetail} ${styles.reveal}`}
              data-climax-reveal="up"
              id={product.slug}
              key={product.slug}
            >
              <span className={styles.productNumber}>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h2>{product.name}</h2>
                <p>{product.summary}</p>
              </div>
              <div className={styles.productDetailGrid}>
                <div>
                  <h3>Usos habituales</h3>
                  <ul>
                    {product.applications.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3>Datos para soporte</h3>
                  <ul>
                    {product.diagnostics.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className={`${styles.productReturn} ${styles.reveal}`} data-climax-reveal="up">
          <Link className={`${styles.button} ${styles.buttonPrimary}`} href="/climax#productos">
            Volver a Climax
          </Link>
        </section>
      </main>
    </div>
  );
}
