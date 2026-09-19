/**
 * ==============================================================================
 * CENTRAL THEME CONFIGURATION (Single Source of Truth)
 * ==============================================================================
 * To change the visual identity, colors, typography or layout radius of the
 * entire application, simply modify the values in this file.
 * All components and CSS variables derive directly from these tokens.
 * ==============================================================================
 */

export interface ThemeConfig {
  brand: {
    name: string;
    tagline: string;
    domain: string;
    logoText: string;
  };
  palette: {
    mode: "light" | "dark" | "system";
    // Minimal Black & White Architectural Palette
    light: {
      background: string;
      surface: string;
      surfaceSubtle: string;
      border: string;
      borderSubtle: string;
      textPrimary: string;
      textSecondary: string;
      textMuted: string;
      accent: string;
      accentForeground: string;
    };
    dark: {
      background: string;
      surface: string;
      surfaceSubtle: string;
      border: string;
      borderSubtle: string;
      textPrimary: string;
      textSecondary: string;
      textMuted: string;
      accent: string;
      accentForeground: string;
    };
  };
  // Lifecycle Stage Colors - Refined Architectural Tone (Clean, subtle, high contrast)
  stages: {
    sales: { label: string; badge: string; dot: string };
    design: { label: string; badge: string; dot: string };
    execution: { label: string; badge: string; dot: string };
    handover: { label: string; badge: string; dot: string };
    inactive: { label: string; badge: string; dot: string };
  };
  typography: {
    fontFamilySans: string;
    fontFamilyMono: string;
  };
  layout: {
    radius: string; // 'none' | 'sm' | 'md' | 'lg' | 'full'
    sidebarWidth: string;
  };
}

export const themeConfig: ThemeConfig = {
  brand: {
    name: "Basekraft",
    tagline: "The Architectural & Turnkey Studio Operating System",
    domain: "basekraft.in",
    logoText: "BASEKRAFT",
  },
  palette: {
    mode: "light",
    light: {
      background: "#ffffff",
      surface: "#fafafa",
      surfaceSubtle: "#f4f4f5",
      border: "#e4e4e7",
      borderSubtle: "#f4f4f5",
      textPrimary: "#09090b",
      textSecondary: "#52525b",
      textMuted: "#a1a1aa",
      accent: "#09090b", // Pure architectural black
      accentForeground: "#ffffff",
    },
    dark: {
      background: "#09090b",
      surface: "#121215",
      surfaceSubtle: "#18181b",
      border: "#27272a",
      borderSubtle: "#1f1f23",
      textPrimary: "#f4f4f5",
      textSecondary: "#a1a1aa",
      textMuted: "#71717a",
      accent: "#fafafa",
      accentForeground: "#09090b",
    },
  },
  stages: {
    sales: {
      label: "Sales & Pitch",
      badge: "bg-zinc-100 text-zinc-900 border-zinc-300 dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700",
      dot: "bg-zinc-700 dark:bg-zinc-300",
    },
    design: {
      label: "Concept & 3D",
      badge: "bg-zinc-100 text-zinc-900 border-zinc-300 dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700",
      dot: "bg-zinc-900 dark:bg-zinc-100",
    },
    execution: {
      label: "On-Site Fit-out",
      badge: "bg-neutral-100 text-neutral-900 border-neutral-300 dark:bg-neutral-800 dark:text-neutral-100 dark:border-neutral-700",
      dot: "bg-neutral-900 dark:bg-neutral-100",
    },
    handover: {
      label: "Handover & Snags",
      badge: "bg-zinc-100 text-zinc-900 border-zinc-300 dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700",
      dot: "bg-emerald-600 dark:bg-emerald-400",
    },
    inactive: {
      label: "Archived / Lost",
      badge: "bg-zinc-100 text-zinc-500 border-zinc-200 dark:bg-zinc-900 dark:text-zinc-500 dark:border-zinc-800",
      dot: "bg-zinc-400 dark:bg-zinc-600",
    },
  },
  typography: {
    fontFamilySans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontFamilyMono: "monospace",
  },
  layout: {
    radius: "0.5rem", // 8px crisp modern rounded borders
    sidebarWidth: "260px",
  },
};
