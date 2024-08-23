import React, { useState } from 'react';
import { AppBar, Toolbar, Box, Button, Tooltip } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { useThemeMode } from '@/contexts/ThemeModeContext';

const useStyles = {
  root: {
    flexGrow: 1,
  },
  menuButton: {
    margin: '0 16px',
    position: 'relative',
  },
  iconSize: {
    fontSize: '2rem',
  },
};

const ActiveUnderline = styled('div')(({ theme }) => ({
  position: 'absolute',
  bottom: -14,
  left: 0,
  right: 0,
  height: 4,
  backgroundColor: theme.palette.primary.main,
}));

const GlassAppBar = styled(AppBar)(({ theme }) => ({
  backdropFilter: 'blur(10px)',
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  WebkitBackdropFilter: 'blur(10px)',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
}));

interface AppBarComponentProps {
}

const AppBarComponent: React.FC<AppBarComponentProps> = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  const [activeTab, setActiveTab] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleTabClick = (tabName: string, path: string) => {
    setActiveTab(tabName);
    navigate(path);
  };

  return (
    <GlassAppBar position="sticky" sx={{ color: 'black', maxWidth: '100vw' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box
          component="img"
          sx={{
            height: 50,
            width: 50,
            marginRight: 2,
          }}
          src="/icons/mindwell-favicon-color.png"
          alt="Logo"
        />
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
          <Tooltip title="Diary" arrow>
            <Button
              sx={{ ...useStyles.menuButton, ...useStyles.iconSize }}
              color="inherit"
              aria-label="diary"
              onClick={() => handleTabClick('diary', `/sharing/${year}/${month}/${day}`)}
            >
              <Box
                component="img"
                sx={{
                  height: 24,
                  width: 24,
                }}
                src="/icons/diary.svg"
                alt=""
              />
              {activeTab === 'diary' && <ActiveUnderline />}
            </Button>
          </Tooltip>
          <Tooltip title="Calendar" arrow>

            <Button
              sx={{ ...useStyles.menuButton, ...useStyles.iconSize }}
              color="inherit"
              aria-label="calendar"
              onClick={() => handleTabClick('calendar', '/history')}
            >
              <Box
                component="img"
                sx={{
                  height: 24,
                  width: 24,
                }}
                src="/icons/calendar.svg"
                alt=""
              />
              {activeTab === 'calendar' && <ActiveUnderline />}
            </Button>
          </Tooltip>
          <Tooltip title="History" arrow>
            <Button
              sx={{ ...useStyles.menuButton, ...useStyles.iconSize }}
              color="inherit"
              aria-label="history"
              onClick={() => handleTabClick('history', '/historySuggestions')}
            >
              <Box
                component="img"
                sx={{
                  height: 24,
                  width: 24,
                }}
                src="/icons/history.svg"
                alt=""
              />
              {activeTab === 'history' && <ActiveUnderline />}
            </Button>
          </Tooltip>
          <Tooltip title="Profile" arrow>
            <Button
              sx={{ ...useStyles.menuButton, ...useStyles.iconSize }}
              color="inherit"
              aria-label="profile"
              onClick={() => handleTabClick('profile', '/profile')}
            >
              <Box
                component="img"
                sx={{
                  height: 24,
                  width: 24,
                }}
                src="/icons/user.svg"
                alt=""
              />
              {activeTab === 'profile' && <ActiveUnderline />}
            </Button>
          </Tooltip>
        </Box>
        <Tooltip title="Logout" arrow>
          <Button color="inherit" onClick={() => navigate('/login')}>
            <Box
              component="img"
              sx={{
                height: 24,
                width: 24,
              }}
              src="/icons/logout.svg"
              alt=""
            />
          </Button>
        </Tooltip>
      </Toolbar>
    </GlassAppBar>
  );
};

export default AppBarComponent;
