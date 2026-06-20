tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        /* ── Brand palette from swatches ── */
        primary:                "#B52A1A",   /* dark red */
        "on-primary":           "#ffffff",
        "primary-container":    "#F5622A",   /* orange */
        "on-primary-container": "#ffffff",
        "primary-fixed":        "#FFD9CC",
        "primary-fixed-dim":    "#FFB597",
        "on-primary-fixed":     "#400E00",
        "on-primary-fixed-variant": "#8A1F00",

        secondary:                "#1E56C4",  /* blue */
        "on-secondary":           "#ffffff",
        "secondary-container":    "#D0DCFF",
        "on-secondary-container": "#001A43",
        "secondary-fixed":        "#DAE2FF",
        "secondary-fixed-dim":    "#B0C3FF",
        "on-secondary-fixed":     "#001A43",
        "on-secondary-fixed-variant": "#003D94",

        tertiary:                "#B52A1A",
        "on-tertiary":           "#ffffff",
        "tertiary-container":    "#FF7A5C",
        "on-tertiary-container": "#400000",
        "tertiary-fixed":        "#FFDAD4",
        "tertiary-fixed-dim":    "#FFB4A6",
        "on-tertiary-fixed":     "#3F0300",
        "on-tertiary-fixed-variant": "#900D00",

        /* ── Yellow accent ── */
        accent:             "#FFBF25",
        "on-accent":        "#1E1E1E",
        "accent-container": "#FFE08A",

        /* ── Surface / background — cream off-white ── */
        background:               "#F2EDE9",
        "on-background":          "#1E1E1E",
        surface:                  "#FAF7F4",
        "on-surface":             "#1E1E1E",
        "surface-bright":         "#FAF7F4",
        "surface-dim":            "#E0DBD7",
        "surface-variant":        "#EDE5DF",
        "on-surface-variant":     "#5C4A3A",
        "surface-tint":           "#B52A1A",
        "surface-container-lowest": "#ffffff",
        "surface-container-low":    "#F0EBE6",
        "surface-container":        "#EAE4DF",
        "surface-container-high":   "#E2DDD8",
        "surface-container-highest":"#D8D2CD",

        /* ── Utility ── */
        outline:              "#9E8679",
        "outline-variant":    "#D4C9C0",
        "inverse-surface":    "#342E2B",
        "inverse-on-surface": "#F7EDE9",
        "inverse-primary":    "#FFB597",

        error:                "#BA1A1A",
        "on-error":           "#ffffff",
        "error-container":    "#FFDAD6",
        "on-error-container": "#93000A",
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "8px",
        xl: "12px",
        "2xl": "16px",
        "3xl": "24px",
        full: "9999px",
      },
      spacing: {
        xs: "8px",
        xl: "64px",
        lg: "40px",
        sm: "16px",
        gutter: "16px",
        "container-margin": "20px",
        md: "24px",
        base: "4px",
      },
      fontFamily: {
        "headline-lg":        ["Anybody", "sans-serif"],
        "display-lg":         ["Anybody", "sans-serif"],
        "headline-md":        ["Anybody", "sans-serif"],
        "label-sm":           ["Geist", "sans-serif"],
        "body-md":            ["Hanken Grotesk", "sans-serif"],
        "body-lg":            ["Hanken Grotesk", "sans-serif"],
        "display-lg-mobile":  ["Anybody", "sans-serif"],
        serif:                ["Playfair Display", "Georgia", "serif"],
      },
      fontSize: {
        "display-lg":        ["64px", { lineHeight: "68px", letterSpacing: "-0.03em",  fontWeight: "800" }],
        "display-lg-mobile": ["44px", { lineHeight: "48px", letterSpacing: "-0.025em", fontWeight: "800" }],
        "headline-lg":       ["40px", { lineHeight: "46px", letterSpacing: "-0.025em", fontWeight: "800" }],
        "headline-xl":       ["48px", { lineHeight: "54px", letterSpacing: "-0.03em",  fontWeight: "800" }],
        "headline-md":       ["28px", { lineHeight: "34px", letterSpacing: "-0.02em",  fontWeight: "800" }],
        "headline-sm":       ["22px", { lineHeight: "28px", letterSpacing: "-0.015em", fontWeight: "800" }],
        "label-sm":          ["13px", { lineHeight: "18px", letterSpacing: "0.08em",   fontWeight: "700" }],
        "body-md":           ["17px", { lineHeight: "26px", fontWeight: "400" }],
        "body-lg":           ["19px", { lineHeight: "30px", fontWeight: "400" }],
      },
    },
  },
};
