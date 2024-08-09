import { ThemeProvider } from "@mui/material";
import { useThemeMode } from "./hooks/ThemeModeContext";
import LoginPage from "./pages/login/Login";
import SignUpPage from "./pages/signup/Signup";
import SharingPage from "./pages/sharing/SharingPage";
import { History as HistoryPage } from "./pages/History";
import HistoryOfSuggestionsPage from "./pages/suggestionHistory/suggestionHistory";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { isAxiosError } from "axios";
import {
  Navigate,
  RouterProvider,
  createHashRouter,
  redirect,
} from "react-router-dom";
import { Layout } from "./components/Layout/Layout";

const router = createHashRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <Layout />,
    loader: () => {
      const hasTokens =
        localStorage.getItem("refreshToken") &&
        localStorage.getItem("accessToken");

      if (!hasTokens) {
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("accessToken");

        return redirect("/login");
      }

      return null;
    },
    children: [
      {
        path: "signup",
        element: <SignUpPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "history",
        element: <HistoryPage />,
      },
      {
        path: "historySuggestions",
        element: <HistoryOfSuggestionsPage />,
      },
      {
        path: "/sharing/:year/:month/:day",
        element: <SharingPage />,
      },
      {
        path: "/",
        element: <Navigate to="/login" />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/login" />,
  },
]);

const MAX_RETRIES = 2;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        if (
          isAxiosError(error) &&
          [404].includes(error.response?.status ?? 0)
        ) {
          console.log(`Aborting retry due to ${error.response?.status} status`);
          return false;
        }

        if (failureCount > MAX_RETRIES) {
          return false;
        }

        return true;
      },
    },
  },
});

const App = () => {
  const { theme } = useThemeMode();

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      {/* <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/history" element={<History />} />
          <Route path="/historySuggestions" element={<HistoryOfSuggestionsPage />} />
          <Route path="/sharing/:year/:month/:day" element={<SharingPage />} />
        </Routes>
      </BrowserRouter> */}
    </ThemeProvider>
  );
};

export default App;
