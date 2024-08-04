import { ThemeProvider } from "@mui/material";
import { useThemeMode } from "./hooks/ThemeModeContext";
import LoginPage from "./pages/login/Login";
import SignUpPage from "./pages/signup/Signup";
import SharingPage from "./pages/sharing/SharingPage";
import { History } from "./pages/History";
import { Route, BrowserRouter, Routes } from "react-router-dom";

const App = () => {
  const { theme } = useThemeMode();

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sharing" element={<SharingPage />} />
          <Route path="/login" element={<History />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
