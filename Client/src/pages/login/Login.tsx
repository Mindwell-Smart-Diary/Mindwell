import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { useThemeMode } from "@/hooks/ThemeModeContext";
import { useState } from "react";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { theme } = useThemeMode();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/signup"); // Adjust the path to match your login route
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email || !password) {
      setError("Please fill in both fields.");
      return;
    }

    setError("");

    const data = { email, password };

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("accessToken", result.accessToken);
        localStorage.setItem("refreshToken", result.refreshToken);

        const today = new Date();

        console.log(today);
        navigate(
          `/sharing/${today.getFullYear()}/${
            today.getMonth() + 1
          }/${today.getDate()}`
        );
      } else {
        setError(result.message || "Login failed");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          style={{ minHeight: "100vh" }}
        >
          <Grid item xs={11} style={{ marginBottom: "16px" }}>
            <Typography component="h1" variant="h2">
              Login
            </Typography>
          </Grid>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            sx={{ width: "100%", maxWidth: 350 }}
            onSubmit={handleLogin}
          >
            <Grid item xs={11} style={{ marginBottom: "16px" }}>
              <TextField
                fullWidth
                id="email"
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={11} style={{ marginBottom: "16px" }}>
              <TextField
                fullWidth
                id="password"
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            {error && (
              <Grid item xs={11} style={{ marginBottom: "16px" }}>
                <Alert severity="error">{error}</Alert>
              </Grid>
            )}
            <Grid
              item
              xs={11}
              container
              direction="row"
              justifyContent="space-between"
            >
              <Grid item xs={7}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Login
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  onClick={handleRedirect}
                >
                  Sign Up
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
