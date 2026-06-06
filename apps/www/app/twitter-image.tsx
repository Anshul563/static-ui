import { ImageResponse } from "next/og"

export const alt = "Static UI"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #030303 0%, #0a0a0a 50%, #030303 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(34,197,94,0.15) 0%, transparent 60%)",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            marginBottom: 24,
          }}
        >
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="30" stroke="#22c55e" strokeWidth="4" />
            <path d="M20 38 L32 22 L44 38" stroke="#22c55e" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M26 32 L32 26 L38 32" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: "white",
              letterSpacing: "-0.02em",
            }}
          >
            Static UI
          </span>
        </div>
        <span
          style={{
            fontSize: 24,
            color: "#a3a3a3",
            letterSpacing: "-0.01em",
          }}
        >
          Beautiful React Components powered by Base UI.
        </span>
      </div>
    ),
    { ...size },
  )
}
