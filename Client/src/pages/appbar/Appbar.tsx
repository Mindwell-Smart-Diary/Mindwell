import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Box, Button, Tooltip } from '@mui/material';
import BookIcon from '@mui/icons-material/Book';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import HistoryIcon from '@mui/icons-material/History';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { styled } from '@mui/system';

const useStyles = {
  root: {
    flexGrow: 1,
  },
  menuButton: {
    margin: '0 16px', // Equal spacing between icons
    position: 'relative',
  },
  iconSize: {
    fontSize: '2rem', // Increase icon size
  },
};

const ActiveUnderline = styled('div')(({ theme }) => ({
  position: 'absolute',
  bottom: -13, // Position the underline directly on the AppBar line
  left: 0,
  right: 0,
  height: 4,
  backgroundColor: theme.palette.primary.main,
}));

interface AppBarComponentProps {
  handleLogout: () => void;
}

const AppBarComponent: React.FC<AppBarComponentProps> = ({ handleLogout }) => {
  const [activeTab, setActiveTab] = useState<string | null>(null);

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  const iconStyle = (tabName: string) => ({
    color: activeTab === tabName ? 'primary.main' : 'inherit',
  });

  return (
    <AppBar position="static" sx={{ bgcolor: 'white', color: 'black', position: 'relative' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box
          component="img"
          sx={{
            height: 50,
            width: 50,
            marginRight: 2,
          }}
          src="src/assets/mindwell-favicon-color.png"
          alt="Logo"
        />
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
          <Tooltip title="Diary" arrow>
            <IconButton sx={{ ...useStyles.menuButton, ...useStyles.iconSize }} color="inherit" aria-label="diary" onClick={() => handleTabClick('diary')}>
              <BookIcon sx={iconStyle('diary')} />
              {activeTab === 'diary' && <ActiveUnderline />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Calendar" arrow>
            <IconButton sx={{ ...useStyles.menuButton, ...useStyles.iconSize }} color="inherit" aria-label="calendar" onClick={() => handleTabClick('calendar')}>
              <CalendarTodayIcon sx={iconStyle('calendar')} />
              {activeTab === 'calendar' && <ActiveUnderline />}
            </IconButton>
          </Tooltip>
          <Tooltip title="History" arrow>
            <IconButton sx={{ ...useStyles.menuButton, ...useStyles.iconSize }} color="inherit" aria-label="history" onClick={() => handleTabClick('history')}>
              <HistoryIcon sx={iconStyle('history')} />
              {activeTab === 'history' && <ActiveUnderline />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Profile" arrow>
            <IconButton sx={{ ...useStyles.menuButton, ...useStyles.iconSize }} color="inherit" aria-label="profile" onClick={() => handleTabClick('profile')}>
              <AccountCircleIcon sx={iconStyle('profile')} />
              {activeTab === 'profile' && <ActiveUnderline />}
            </IconButton>
          </Tooltip>
        </Box>
        <Button color="inherit" startIcon={<ExitToAppIcon />} onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarComponent;
