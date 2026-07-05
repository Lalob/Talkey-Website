import { ImageResponse } from "next/og";

export const alt = "Talkey - Asistente virtual de soporte técnico";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#070707",
          color: "#f4f0e8",
          padding: 76,
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div
            style={{
              display: "flex",
              width: 86,
              height: 86,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 24,
              background: "#ffc638",
              color: "#070707",
              fontSize: 48,
              fontWeight: 900,
            }}
          >
            T
          </div>
          <div style={{ color: "#ffc638", fontSize: 58, fontWeight: 900, letterSpacing: "-0.04em" }}>Talkey</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ maxWidth: 880, fontSize: 76, fontWeight: 800, lineHeight: 0.96, letterSpacing: "-0.055em" }}>
            Soporte técnico que responde desde tu conocimiento.
          </div>
          <div style={{ maxWidth: 760, marginTop: 28, color: "#bdb8ae", fontSize: 31, lineHeight: 1.35 }}>
            Asistente virtual para diagnosticar, resolver y derivar casos de postventa con contexto.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
