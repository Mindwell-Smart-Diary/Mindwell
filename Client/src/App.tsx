import { ThemeProvider } from "@mui/material";
import { useThemeMode } from "./hooks/ThemeModeContext";
import LoginPage from "./pages/login/Login";
import SignUpPage from "./pages/signup/Signup";
import SharingPage from "./pages/sharing/SharingPage";
import { History as HistoryPage } from "./pages/history/History";
import HistoryOfSuggestionsPage from "./pages/suggestionHistory/suggestionHistory";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { isAxiosError } from "axios";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "signup",
    element: <SignUpPage />,
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
        path: "history",
        element: <HistoryPage />,
      },
      {
        path: "historySuggestions",
        element: <HistoryOfSuggestionsPage />,
      },
      {
        path: "sharing/:year/:month/:day",
        element: <SharingPage />,
      },
      {
        path: "/",
        element: <Navigate to="/history" />,
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
    </ThemeProvider>
  );
};

export default App;
