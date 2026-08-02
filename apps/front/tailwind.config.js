import plugin from "tailwindcss/plugin"
import forms from "@tailwindcss/forms"
import typography from "@tailwindcss/typography"
import uiConfig from "../../packages/ui/tailwind.config"

/** @type {import('tailwindcss').Config} */
export default {
  presets: [uiConfig],
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}"
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  safelist: [
    'border-border',
    'text-orange-700',
    'text-blue-700',
    'text-green-700',
    'border-orange-700',
    'border-blue-700',
    'border-green-700',
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["var(--font-poppins)", "system-ui", "sans-serif"],
        neco: ["var(--font-neco)", "system-ui", "sans-serif"],
        pally: ["var(--font-pally)", "system-ui", "sans-serif"],
        display: ["var(--font-sf)", "system-ui", "sans-serif"],
        default: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: 0, transform: "translateY(10px)" },
          "80%": { opacity: 0.6 },
          "100%": { opacity: 1, transform: "translateY(0px)" },
        },
        "fade-down": {
          "0%": { opacity: 0, transform: "translateY(-10px)" },
          "80%": { opacity: 0.6 },
          "100%": { opacity: 1, transform: "translateY(0px)" },
        },
        "slide-up-fade": {
          "0%": { opacity: 0, transform: "translateY(6px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "slide-down-fade": {
          "0%": { opacity: 0, transform: "translateY(-6px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        scroll: {
          to: { transform: "translate(calc(-50% - 0.5rem))" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-up": "fade-up 0.5s",
        "fade-down": "fade-down 0.5s",
        "slide-up-fade": "slide-up-fade 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-down-fade": "slide-down-fade 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        scroll: "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
        "meteor-effect": "meteor 5s linear infinite",
      },
    },
  },
  plugins: [
    forms,
    typography,
    plugin(({ addVariant }) => {
      addVariant("radix-side-top", '&[data-side="top"]')
      addVariant("radix-side-bottom", '&[data-side="bottom"]')
    }),
  ],
}