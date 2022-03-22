import React, { useContext } from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Tooltip, MenuItem, Button } from '@mui/material';
import RegisterModal from '../RegisterModal/RegisterModal';
import AuthModal from '../AuthModal/AuthModal';
import { authContext } from '../../Contexts/auth.context';
import { observer } from 'mobx-react-lite';
import store from '../../Store/store';
import { deepOrange, indigo } from '@mui/material/colors';

const settings = ['Entry', 'Registration', 'Logout'];

const TopBar = () => {
  const { logout, userName, isAuthentificated } = useContext(authContext);
  const [ anchorElUser, setAnchorElUser ] = React.useState(null);
  const { togglerReg, togglerAuth } = store;
  
  const handleOpenUserMenu = (evt) => {
    setAnchorElUser(evt.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  }

  function stringAvatar(name) {
    let lit;
    if (name) {
      lit = name.split(' ')[0][0];
    }
    return {
      sx: {
        bgcolor: deepOrange[400],
      },
      children: `${lit}`,
    };
  }

  const handleMenu = (evt) => {
    setAnchorElUser(null);

    switch (evt.currentTarget.name) {
      case 'Registration':
      togglerReg();
      break;
      case 'Entry':
      togglerAuth();
      break;
      case 'Logout':
        logout();
        break;
      default:
        break;
    };
  };

  return (
      <AppBar 
        position="static" 
        sx={{bgcolor: indigo[600], border: '3px solid', borderRadius: '50px', borderColor: indigo[900], boxShadow: '0 0 10px #1a237e inset', marginY: '10px'}}
      >
      <Container maxWidth="xl">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{flexGrow: 1 ,display: 'flex',color: deepOrange[400]}}
          >
            friendzone
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                { isAuthentificated ? <Avatar  {...stringAvatar(userName)} /> : <Avatar />}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting}>
                    <Button variant='text' name={setting} onClick={handleMenu}>
                        {setting}
                    </Button>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
      <RegisterModal />     
      <AuthModal />
    </AppBar>
  );
};

export default observer(TopBar);