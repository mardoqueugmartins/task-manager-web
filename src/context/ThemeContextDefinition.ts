import { createContext } from "react";

export type Theme = "light" | "dark";

export type ThemeContextData = {
  theme: Theme;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextData | null>(null);