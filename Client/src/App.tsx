import { ThemeProvider } from "@mui/material";
import { useThemeMode } from "./hooks/ThemeModeContext";
import LoginPage from "./pages/login/Login";
import SignUpPage from "./pages/signup/Signup";
import SharingPage from "./pages/sharing/SharingPage";
import { History } from "./pages/History";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import HistoryOfSuggestionsPage from "./pages/suggestionHistory/suggestionHistory";

const App = () => {
  const { theme } = useThemeMode();

  return (
    <ThemeProvider theme={theme}>
       <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/history" element={<History />} />
            <Route path="/historySuggestions" element={<HistoryOfSuggestionsPage />} />
            <Route path="/sharing/:year/:month/:day" element={<SharingPage />} />
          </Routes>
       </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
