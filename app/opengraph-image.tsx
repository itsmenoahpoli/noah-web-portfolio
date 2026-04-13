import { ImageResponse } from "next/og";

export const alt = "Patrick Niño Noah W Policarpio";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#020617",
        color: "white",
        fontFamily: "sans-serif",
        padding: "56px",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -140,
          left: -100,
          width: 420,
          height: 420,
          borderRadius: "9999px",
          backgroundColor: "#2563eb",
          opacity: 0.18,
        }}
      />
      <div
        style={{
          position: "absolute",
          right: -80,
          bottom: -180,
          width: 460,
          height: 460,
          borderRadius: "9999px",
          backgroundColor: "#a855f7",
          opacity: 0.16,
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          width: "100%",
          height: "100%",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: "28px",
          padding: "48px",
          background: "rgba(15, 23, 42, 0.72)",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 24,
            color: "rgba(255,255,255,0.72)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Portfolio
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            maxWidth: "82%",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 72,
              fontWeight: 700,
              lineHeight: 1.05,
            }}
          >
            Patrick Nino Noah W Policarpio
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              lineHeight: 1.35,
              color: "rgba(255,255,255,0.84)",
            }}
          >
            Senior Software Engineer and Tech Lead building scalable web and
            mobile applications.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: 18,
            fontSize: 24,
            color: "rgba(255,255,255,0.72)",
          }}
        >
          <div style={{ display: "flex" }}>Web App Development</div>
          <div style={{ display: "flex" }}>Mobile App Development</div>
        </div>
      </div>
    </div>,
    size,
  );
}
