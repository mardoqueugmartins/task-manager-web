import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContextDefinition";

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside a ThemeProvider");
  }

  return context;
};