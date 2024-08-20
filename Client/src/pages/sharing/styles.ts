import { SxProps } from "@mui/system";

export const container: SxProps = {
  p: "2rem 0",
  width: "50%",
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  overflow: "scroll",
  gap: "1.5rem",
};

export const title: SxProps = {
  fontSize: "2rem",
  color: "#3A3A3A",
  fontWeight: "bold",
};

export const dailySharingText: SxProps = {
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "inherit",
      borderWidth: "1px",
    },
  },
};

export const suggestionCard: SxProps = {
  display: "flex",
  flexDirection: "column",
  bgcolor: "#AFDCBE",
  color: "white",
  p: "1rem",
  gap: "0.5rem",
  borderRadius: "1rem",
  wordWrap: "break-word",
  maxWidth: "100%",
  boxShadow: "none",
};

export const suggestionText: SxProps = {
  color: "white",
  display: "inline-block",
  wordWrap: "break-word",
  maxWidth: "100%",
  marginBottom: "10px",
};

export const suggestionButton: SxProps = {
  bgcolor: "#7EC796",
  fontWeight: "bold",
  color: "white",
  p: "0.5rem 1rem",
  borderRadius: "1rem",
};

export const listContainer: SxProps = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  ml: "5%",
  gap: "0.5rem",
  maxWidth: "90%",
};
export const dailySharingCard: SxProps = {
  bgcolor: "#7EC796",
  color: "white",
  p: "1rem",
  borderRadius: "1rem",
  display: "inline-block",
  wordWrap: "break-word",
  maxWidth: "100%",
  boxShadow: "none",
};

export const dailySharingField: SxProps = {
  whiteSpace: "pre-wrap",
  wordWrap: "break-word",
  overflowWrap: "break-word",
  wordBreak: "break-all",
  fontSize: "1.2rem",
  fontWeight: "bold",
};

export const dateField: SxProps = {
  fontSize: "0.8rem",
  color: "rgba(0, 0, 0, 0.6)",
};

export const mainContainer: SxProps = {
  backdropFilter: "blur(10px)",
  backgroundColor: "rgba(255, 255, 255, 0.5)",
  WebkitBackdropFilter: "blur(10px)",
  boxShadow: "0 1px 10px rgba(0, 0, 0, 0.05)",
  position: "sticky",
  top: "64px",
};

export const main: SxProps = {
  ...container,
  p: "2rem 0",
  width: "50%",
};
