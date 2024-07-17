import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
} from "react";
import { Theme, createTheme } from "@mui/material/styles";

export interface ThemeModeContextProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  theme: Theme;
}

const ThemeModeContext = createContext<ThemeModeContextProps | undefined>(
  undefined
);

// eslint-disable-next-line react-refresh/only-export-components
export const useThemeMode = () => {
  const context = useContext(ThemeModeContext);
  if (!context) {
    throw new Error("useThemeMode must be used within a ThemeModeProvider");
  }
  return context;
};

interface ThemeModeProviderProps {
  children: ReactNode;
}

const getTheme = (isDarkMode: boolean) =>
  createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
      primary: {
        main: isDarkMode ? "#9FA8DA" : "#6C63FF",
        light: isDarkMode ? "#D1D9FF" : "#A89CFF",
        dark: isDarkMode ? "#6F79A8" : "#3E39B2",
      },
      secondary: {
        main: isDarkMode ? "#FFB74D" : "#FFC947",
        light: isDarkMode ? "#FFE97D" : "#FFE08A",
        dark: isDarkMode ? "#C88719" : "#C39D22",
      },
      background: {
        default: isDarkMode ? "#121212" : "#F5F5F5",
        paper: isDarkMode ? "#1E1E1E" : "#FFFFFF",
      },
      text: {
        primary: isDarkMode ? "#FFFFFF" : "#000000",
        secondary: isDarkMode ? "#B0B0B0" : "#666666",
      },
    },
  });

export const ThemeModeProvider: React.FC<ThemeModeProviderProps> = ({
  children,
}) => {
  const storedDarkMode = localStorage.getItem("darkMode") === "true";
  const [isDarkMode, setDarkMode] = useState(storedDarkMode);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", String(newDarkMode));
  };

  const theme = useMemo(() => {
    const theme = getTheme(isDarkMode);
    document.documentElement.style.backgroundColor =
      theme.palette.background.default;
    return theme;
  }, [isDarkMode]);

  const value: ThemeModeContextProps = {
    isDarkMode,
    toggleDarkMode,
    theme,
  };

  return (
    <ThemeModeContext.Provider value={value}>
      {children}
    </ThemeModeContext.Provider>
  );
};
