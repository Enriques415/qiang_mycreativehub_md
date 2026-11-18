import { useEffect } from "react";

const DIFYP_CONFIG = {
  token: "7eDmvVv2vtjRSbBx",
  baseUrl: "http://43.167.234.114",
  inputs: {},
  systemVariables: {},
  userVariables: {},
};

export function DifyEmbed() {
  useEffect(() => {
    const config = {
      token: DIFYP_CONFIG.token,
      baseUrl: DIFYP_CONFIG.baseUrl,
      inputs: DIFYP_CONFIG.inputs,
      systemVariables: DIFYP_CONFIG.systemVariables,
      userVariables: DIFYP_CONFIG.userVariables,
    };

    window.difyChatbotConfig = config;

    const existingScript = document.getElementById(DIFYP_CONFIG.token);
    if (!existingScript) {
      const script = document.createElement("script");
      script.id = DIFYP_CONFIG.token;
      script.src = `${DIFYP_CONFIG.baseUrl}/embed.min.js`;
      script.defer = true;
      document.body.appendChild(script);
    }

    const style = document.createElement("style");
    style.setAttribute("data-dify-embed", "true");
    style.textContent = `
      #dify-chatbot-bubble-button {
        background-color: var(--primary) !important;
        width: 56px !important;
        height: 56px !important;
        bottom: 24px !important;
        right: 24px !important;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3) !important;
      }
      #dify-chatbot-bubble-button svg {
        fill: var(--primary-foreground) !important;
      }
      #dify-chatbot-bubble-window {
        width: 400px !important;
        height: 600px !important;
        max-height: calc(100vh - 120px) !important;
        border-radius: 12px !important;
        border: 1px solid var(--hairline) !important;
        box-shadow: var(--shadow-card) !important;
        overflow: hidden !important;
      }
      #dify-chatbot-window-container {
        background-color: var(--background) !important;
      }
      #dify-chatbot-close-button {
        color: var(--foreground) !important;
      }
      #dify-chatbot-input-holder {
        background-color: var(--surface) !important;
        border-color: var(--hairline) !important;
      }
      #dify-chatbot-text-input {
        color: var(--foreground) !important;
        background-color: transparent !important;
      }
      #dify-chatbot-text-input::placeholder {
        color: var(--muted-foreground) !important;
      }
      #dify-chatbot-send-btn {
        background-color: var(--primary) !important;
      }
      #dify-chatbot-message-container {
        background-color: var(--background) !important;
      }
      .dify-message-item {
        background-color: var(--surface) !important;
        color: var(--foreground) !important;
        border-radius: 16px !important;
      }
      .dify-user-message {
        background-color: var(--primary) !important;
        color: var(--primary-foreground) !important;
      }
      .dify-chatbot-footer {
        background-color: var(--background) !important;
        border-top-color: var(--hairline) !important;
      }
      .dify-chatbot-footer-text {
        color: var(--muted-foreground) !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      const script = document.getElementById(DIFYP_CONFIG.token);
      if (script) {
        script.remove();
      }
      const existingStyle = document.querySelector('style[data-dify-embed]');
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);

  return null;
}

declare global {
  interface Window {
    difyChatbotConfig: {
      token: string;
      baseUrl: string;
      inputs?: Record<string, unknown>;
      systemVariables?: Record<string, unknown>;
      userVariables?: Record<string, unknown>;
    };
  }
}