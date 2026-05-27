import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/purity": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "components/ui/accordion.tsx",
    "components/ui/alert-dialog.tsx",
    "components/ui/aspect-ratio.tsx",
    "components/ui/calendar.tsx",
    "components/ui/carousel.tsx",
    "components/ui/chart.tsx",
    "components/ui/checkbox.tsx",
    "components/ui/collapsible.tsx",
    "components/ui/command.tsx",
    "components/ui/context-menu.tsx",
    "components/ui/dialog.tsx",
    "components/ui/drawer.tsx",
    "components/ui/form.tsx",
    "components/ui/hover-card.tsx",
    "components/ui/input-otp.tsx",
    "components/ui/menubar.tsx",
    "components/ui/navigation-menu.tsx",
    "components/ui/popover.tsx",
    "components/ui/radio-group.tsx",
    "components/ui/resizable.tsx",
    "components/ui/scroll-area.tsx",
    "components/ui/select.tsx",
    "components/ui/separator.tsx",
    "components/ui/sheet.tsx",
    "components/ui/sidebar.tsx",
    "components/ui/slider.tsx",
    "components/ui/sonner.tsx",
    "components/ui/switch.tsx",
    "components/ui/tabs.tsx",
    "components/ui/toast.tsx",
    "components/ui/toaster.tsx",
    "components/ui/toggle.tsx",
    "components/ui/toggle-group.tsx",
    "components/ui/tooltip.tsx",
    "components/ui/use-mobile.tsx",
    "components/ui/use-toast.ts",
    "hooks/use-mobile.ts",
    "hooks/use-toast.ts",
  ]),
]);

export default eslintConfig;
