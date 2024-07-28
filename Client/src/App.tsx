import { ThemeProvider } from "@mui/material";
import { useThemeMode } from "./hooks/ThemeModeContext";
import { History } from "./pages/History";

const App = () => {
  const { theme } = useThemeMode();

  return (
    <ThemeProvider theme={theme}>
      <History />
    </ThemeProvider>
  );
};

export default App;
