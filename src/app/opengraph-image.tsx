import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Varun Pahuja — Full-Stack Developer & IoT Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 80px",
          backgroundColor: "#06060a",
          backgroundImage:
            "radial-gradient(circle at 15% 20%, rgba(220, 53, 69, 0.15) 0%, transparent 45%), radial-gradient(circle at 85% 80%, rgba(201, 168, 76, 0.1) 0%, transparent 40%)",
          color: "#f5f2eb",
          fontFamily: "monospace",
          border: "2px solid rgba(220, 53, 69, 0.4)",
        }}
      >
        {/* Top Header Bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
            paddingBottom: "24px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor: "#dc3545",
              }}
            />
            <span
              style={{
                fontSize: "20px",
                fontWeight: 700,
                color: "#dc3545",
                letterSpacing: "0.15em",
              }}
            >
              朱 // VARUN PAHUJA
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "16px",
              color: "#c9a84c",
              border: "1px solid rgba(201, 168, 76, 0.4)",
              padding: "6px 14px",
              borderRadius: "999px",
            }}
          >
            <span>B.Tech IoT • MITS Gwalior</span>
          </div>
        </div>

        {/* Center Hero Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", margin: "auto 0" }}>
          <div
            style={{
              fontSize: "56px",
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "#f5f2eb",
            }}
          >
            Systems Where Web Meets Hardware.
          </div>
          <div
            style={{
              fontSize: "24px",
              color: "#a1a1aa",
              lineHeight: 1.4,
              maxWidth: "960px",
            }}
          >
            Full-Stack Developer & IoT Engineer specializing in ESP32 embedded systems,
            distributed CRDTs, satellite AI models, and real-time interactive interfaces.
          </div>
        </div>

        {/* Bottom Flagship Systems Chips */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            borderTop: "1px solid rgba(255, 255, 255, 0.12)",
            paddingTop: "24px",
          }}
        >
          <div style={{ display: "flex", gap: "14px" }}>
            {[
              "Air Mouse AI",
              "SyncDoc CRDT",
              "OceanEmbed AI",
              "webcmd Engine",
            ].map((chip) => (
              <div
                key={chip}
                style={{
                  padding: "8px 16px",
                  borderRadius: "8px",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  fontSize: "14px",
                  color: "#e8e5dc",
                  fontWeight: 600,
                }}
              >
                {chip}
              </div>
            ))}
          </div>

          <div
            style={{
              fontSize: "16px",
              color: "#dc3545",
              fontWeight: 700,
              letterSpacing: "0.05em",
            }}
          >
            varun-pahuja.github.io/portfolio
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
