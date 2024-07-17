import { Button, Card, ThemeProvider } from "@mui/material";
import { useThemeMode } from "./hooks/ThemeModeContext";

const App = () => {
  const { isDarkMode, toggleDarkMode, theme } = useThemeMode();

  return (
    <ThemeProvider theme={theme}>
      <Card sx={{ p: 5, m: 8, width: 200, height: 200 }}>
        <Button variant="contained" color="secondary" onClick={toggleDarkMode}>
          {!isDarkMode ? "Light Mode" : "Dark Mode"}
        </Button>
        <Button variant="contained" color="primary" onClick={toggleDarkMode}>
          {!isDarkMode ? "Light Mode" : "Dark Mode"}
        </Button>
      </Card>
    </ThemeProvider>
  );
};

export default App;
