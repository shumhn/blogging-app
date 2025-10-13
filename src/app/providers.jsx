"use client";

import { createContext, useMemo } from "react";
import { ThemeProvider, useTheme } from "next-themes";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react";
import useLocalStorage from "@/hooks/use-local-storage";

export const AppContext = createContext({
  font: "Default",
  setFont: () => {},
  theme: "system",
  resolvedTheme: "system",
  setTheme: () => {},
  isDark: false,
});

const ToasterProvider = () => {
  const { theme } = useTheme();
  return <Toaster theme={theme} />;
};

function AppContextBridge({ children, font, setFont }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const activeTheme = resolvedTheme ?? theme ?? "system";
  const isDark = activeTheme === "dark";

  const value = useMemo(
    () => ({
      font,
      setFont,
      theme: theme ?? "system",
      resolvedTheme: activeTheme,
      setTheme,
      isDark,
    }),
    [font, setFont, theme, activeTheme, setTheme, isDark],
  );

  return (
    <AppContext.Provider value={value}>
      <ToasterProvider />
      {children}
      <Analytics />
    </AppContext.Provider>
  );
}

export default function Providers({ children }) {
  const [font, setFont] = useLocalStorage("novel__font", "Default");

  return (
    <ThemeProvider attribute="class" enableSystem disableTransitionOnChange defaultTheme="dark">
      <AppContextBridge font={font} setFont={setFont}>
        {children}
      </AppContextBridge>
    </ThemeProvider>
  );
}