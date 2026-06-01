"use client";

import { siteConfig } from "@/app/config";

export default function FloatingWhatsApp() {
  const number = siteConfig.whatsapp.replace(/[^0-9]/g, "");
  const url = `https://wa.me/${number}?text=${encodeURIComponent("Hi Harsh, I found your portfolio and would love to connect!")}`;

  return (
    <a
      id="floating-whatsapp-btn"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      style={{
        position: "fixed",
        left: "20px",
        bottom: "30px",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "52px",
        height: "52px",
        borderRadius: "50%",
        background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
        boxShadow: "0 4px 24px 0 rgba(37,211,102,0.45)",
        transition: "transform 0.2s, box-shadow 0.2s",
        textDecoration: "none",
        animation: "waPulse 2.2s ease-in-out infinite",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "scale(1.13)";
        e.currentTarget.style.boxShadow = "0 8px 32px 0 rgba(37,211,102,0.6)";
        e.currentTarget.style.animation = "none";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 4px 24px 0 rgba(37,211,102,0.45)";
        e.currentTarget.style.animation = "waPulse 2.2s ease-in-out infinite";
      }}
    >
      {/* WhatsApp SVG logo */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        width="28"
        height="28"
        fill="white"
      >
        <path d="M16.003 2.667C8.637 2.667 2.667 8.637 2.667 16c0 2.357.634 4.643 1.837 6.641L2.667 29.333l6.88-1.807A13.297 13.297 0 0016.003 29.333C23.363 29.333 29.333 23.363 29.333 16S23.363 2.667 16.003 2.667zm0 24.267a11.2 11.2 0 01-5.72-1.568l-.41-.243-4.083 1.073 1.087-3.973-.267-.43A11.2 11.2 0 014.8 16c0-6.177 5.027-11.2 11.203-11.2 6.177 0 11.2 5.023 11.2 11.2 0 6.177-5.023 11.133-11.2 11.133zm6.133-8.327c-.337-.167-1.987-.98-2.293-1.093-.307-.107-.53-.16-.753.16-.22.32-.857 1.093-1.05 1.317-.193.22-.387.247-.72.08-.334-.167-1.407-.52-2.68-1.653-.99-.883-1.66-1.973-1.853-2.307-.193-.337-.02-.52.147-.687.15-.15.333-.393.5-.587.167-.193.22-.333.333-.553.113-.22.057-.413-.027-.58-.08-.167-.753-1.813-1.033-2.48-.273-.65-.547-.563-.753-.573l-.64-.013c-.22 0-.577.08-.88.397-.3.317-1.15 1.123-1.15 2.74 0 1.617 1.177 3.18 1.34 3.4.167.22 2.317 3.54 5.613 4.963.787.34 1.4.543 1.877.693.787.25 1.503.217 2.07.133.63-.093 1.987-.813 2.267-1.6.28-.787.28-1.46.197-1.6-.08-.14-.3-.22-.637-.387z"/>
      </svg>

      {/* Keyframe animation injected inline */}
      <style>{`
        @keyframes waPulse {
          0%, 100% { box-shadow: 0 4px 24px 0 rgba(37,211,102,0.45); }
          50% { box-shadow: 0 4px 40px 8px rgba(37,211,102,0.7); }
        }
      `}</style>
    </a>
  );
}
