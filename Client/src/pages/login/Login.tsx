import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import UserManagementLayout from "@/components/Layout/UserManagementLayout";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { LoginResultDto } from "@/types/LoginResultDto";

export default function LoginPage() {
  const { login } = useAuth();

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
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        login(result as LoginResultDto);

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
    <UserManagementLayout>
      <Box
        component="form"
        noValidate
        flexDirection="column"
        display="flex"
        gap="16px"
        autoComplete="off"
        sx={{ width: "100%" }}
        onSubmit={handleLogin}
      >
        <TextField
          fullWidth
          id="email"
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          id="password"
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && (
          <Alert severity="error" variant="filled">
            {error}
          </Alert>
        )}
        <Box display="flex" flexDirection="row" gap={"10px"}>
          <Button
            sx={{ flexBasis: "66%" }}
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Login
          </Button>
          <Button
            sx={{ flexBasis: "33%" }}
            variant="text"
            color="primary"
            fullWidth
            onClick={handleRedirect}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </UserManagementLayout>
  );
}
