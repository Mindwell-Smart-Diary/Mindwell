import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import CalendarToday from '@mui/icons-material/CalendarToday';
import HistoryIcon from '@mui/icons-material/History';
import ExitToApp from '@mui/icons-material/ExitToApp';
import Brightness4 from '@mui/icons-material/Brightness4';
import Brightness7 from '@mui/icons-material/Brightness7';

const useStyles = {
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: 2,
  },
  title: {
    flexGrow: 1,
  },
  iconTextButton: {
    display: 'flex',
    alignItems: 'center',
    textTransform: 'none',
    position: 'relative',
    overflow: 'hidden',
    '& .icon-text': {
      display: 'inline-block',
      marginLeft: '0.5rem',
      maxWidth: 0,
      opacity: 0,
      transition: 'max-width 0.5s, opacity 0.5s, margin-left 0.5s',
    },
    '&:hover .icon-text': {
      maxWidth: '100px',
      opacity: 1,
      marginLeft: '0.5rem',
    },
  },
};

interface AppBarComponentProps {
  darkMode: boolean;
  handleDarkModeToggle: () => void;
  handleLogout: () => void;
}

const AppBarComponent: React.FC<AppBarComponentProps> = ({ darkMode, handleDarkModeToggle, handleLogout }) => {
  return (
    <AppBar position="static" sx={{ bgcolor: 'white', color: 'black' }}>
      <Toolbar>
        <Box
          component="img"
          sx={{
            height: 50,
            width: 50,
            maxHeight: { xs: 50, md: 50 },
            maxWidth: { xs: 50, md: 50 },
          }}
          src="src/assets/mindwell-favicon-color.png"
        />
        <Typography variant="h4" sx={useStyles.title}>
          Mindwell
        </Typography>
        <Button color="inherit" sx={useStyles.iconTextButton} onClick={() => window.location.href = '/profile'}>
          <AccountCircle />
          <span className="icon-text">Profile</span>
        </Button>
        <Button color="inherit" sx={useStyles.iconTextButton} onClick={() => window.location.href = '/calendar'}>
          <CalendarToday />
          <span className="icon-text">Calendar</span>
        </Button>
        <Button color="inherit" sx={useStyles.iconTextButton} onClick={() => window.location.href = '/history'}>
          <HistoryIcon />
          <span className="icon-text">History</span>
        </Button>
        <Button color="inherit" sx={useStyles.iconTextButton} onClick={handleLogout}>
          <ExitToApp />
          <span className="icon-text">Logout</span>
        </Button>
        <IconButton color="inherit" onClick={handleDarkModeToggle}>
          {darkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarComponent;


