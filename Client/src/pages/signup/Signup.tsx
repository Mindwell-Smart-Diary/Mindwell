import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import UserManagementLayout from "@/components/Layout/UserManagementLayout";

const SignUpPage: React.FC = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/login"); // Adjust the path to match your login route
  };

  const sendSignUpData = async (
    firstName: string,
    lastName: string,
    birthdate: string,
    gender: string,
    email: string,
    password: string
  ) => {
    try {
      // TODO: send to server currectly
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          birthdate,
          gender,
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return await response.json();
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const handleSignUp = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    if (
      !firstName ||
      !lastName ||
      !dateOfBirth ||
      !email ||
      !gender ||
      !password ||
      !confirmPassword
    ) {
      setError("All fields are required.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Invalid email format.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    try {
      const result = await sendSignUpData(
        firstName,
        lastName,
        dateOfBirth,
        gender,
        email,
        password
      );
      localStorage.setItem("accessToken", result.accessToken);
      localStorage.setItem("refreshToken", result.refreshToken);

      const today = new Date();

      navigate(
        `/sharing/${today.getFullYear()}/${
          today.getMonth() + 1
        }/${today.getDate()}`
      );
    } catch {
      setError("Failed to register, please try again later");
    }
  };

  return (
    <UserManagementLayout>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{ width: "100%", maxWidth: 400 }}
        onSubmit={handleSignUp}
        display="flex"
        flexDirection="column"
        gap="10px"
      >
        <Box display="flex" flexDirection="row" gap="10px">
          <TextField
            fullWidth
            id="firstName"
            label="First Name"
            variant="outlined"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            fullWidth
            id="lastName"
            label="Last Name"
            variant="outlined"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Box>
        <TextField
          fullWidth
          id="dateOfBirth"
          label="Date of Birth"
          type="date"
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
        />
        <FormControl fullWidth>
          <InputLabel id="gender-label">Gender</InputLabel>

          <Select
            fullWidth
            labelId="gender-label"
            label="Gender"
            id="gender"
            variant="outlined"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
        </FormControl>
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
        <TextField
          fullWidth
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          variant="outlined"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {error && (
          <Alert severity="error" variant="filled">
            {error}
          </Alert>
        )}
        <Box display="flex" flexDirection="row" gap="10px">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ flexBasis: "66%" }}
          >
            Sign up
          </Button>
          <Button
            sx={{ flexBasis: "33%" }}
            variant="text"
            color="primary"
            fullWidth
            onClick={handleRedirect}
          >
            Login
          </Button>
        </Box>
      </Box>
    </UserManagementLayout>
  );
};

export default SignUpPage;
