import * as React from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import logo from "../../assets/logo-full.png";
import { useThemeMode } from "@/contexts/ThemeModeContext";

export default function UserManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useThemeMode();

  return (
    <ThemeProvider theme={theme}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height={"100vh"}
        position="relative"
      >
        <Container sx={{ width: "fit-content" }}>
          <Box
            flexDirection="column"
            display="flex"
            gap="16px"
            justifyContent="center"
            alignItems="center"
            sx={{
              backdropFilter: "blur(10px)",
              backgroundColor: "rgba(247, 247, 247, 0.5)",
              WebkitBackdropFilter: "blur(10px)",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
              padding: "30px",
              width: "30vw",
              borderRadius: "20px",
            }}
          >
            <Grid item xs={11} style={{ marginBottom: "16px" }}>
              <img src={logo} width={"100%"} />
            </Grid>
            {children}
          </Box>
        </Container>
        <Box
          sx={{
            position: "absolute",
            width: "100vw",
            zIndex: "-10",
            bottom: "0",
          }}
        >
          <svg
            viewBox="-304.643 71.0319 1184.1211 280.1101"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M -304.643 196.392 L -304.643 143.633 C -257.485 118.331 -202.424 106.967 -148.734 111.72 C -79.305 117.841 -14.208 149.685 55.33 154.461 C 128.193 159.43 200.917 135.222 270.642 114.273 C 338.996 93.758 407.112 85.916 477.272 99.365 C 512.943 106.204 546.197 119.698 580.339 132.805 C 671.754 167.898 793.629 212.679 879.478 136.589 L 879.478 196.392 L -304.643 196.392 Z"
              opacity=".25"
              fill="#6A63F6"
            />
            <path
              d="M -304.643 196.392 L -304.643 178.372 C -291.815 154.312 -277.369 131.586 -257.584 114.273 C -206.548 69.572 -141.826 69.88 -83.035 92.014 C -52.297 103.582 -23.74 121.727 5.449 137.376 C 45.827 159.031 89.058 189.804 134.547 193.987 C 170.328 197.235 204.509 183.25 231.843 158.017 C 263.192 129.078 293.338 87.352 334.101 74.815 C 374.006 62.517 414.375 82.44 451.655 102.488 C 488.935 122.536 525.821 146.938 567.028 151.554 C 625.968 158.222 678.809 125.477 733.693 107.287 C 763.493 97.416 791.912 100.254 819.631 115.835 C 841.764 128.246 866.995 146.528 879.478 171.956 L 879.478 196.392 L -304.643 196.392 Z"
              opacity=".5"
              fill="#6A63F6"
            />
            <path
              d="M -304.643 196.392 L -304.643 189.975 C -156.697 129.147 5.291 115.105 164.891 147.873 C 207.322 156.58 248.006 170.804 290.812 178.03 C 349.031 187.866 401.804 164.08 454.181 137.683 C 512.331 108.381 569.633 87.843 633.97 93.815 C 719.355 101.793 804.148 145.912 879.478 190.476 L 879.478 196.392 L -304.643 196.392 Z"
              fill="#6A63F6"
            />
            <rect
              x="-304.622"
              y="195.261"
              width="1184.1"
              height="159.881"
              fill="#6A63F6"
            />
          </svg>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
