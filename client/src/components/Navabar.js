import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import { useContext, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// import svg
import { ReactComponent as ReactLogo } from '../assets/logo.svg';
import { AuthContext } from '../context/auth-context';

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const auth = useContext(AuthContext);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            <ReactLogo />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {/*Mobile Menu*/}
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">
                  <Link component={RouterLink} to={`/`} underline="none">
                    Home
                  </Link>
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">
                  <Link component={RouterLink} to={`/login`} underline="none">
                    Login
                  </Link>
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">
                  <Link component={RouterLink} to={`/signup`} underline="none">
                    Sign Up
                  </Link>
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
          {/* Big Screen Menu */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
              component={RouterLink}
              to={`/`}
            >
              Home
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {!auth.isLoggedIn ? (
              <Box sx={{ display: 'flex' }}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                  component={RouterLink}
                  to={`/login`}
                >
                  Login
                </Button>

                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                  component={RouterLink}
                  to={`/signup`}
                >
                  Sign Up
                </Button>
              </Box>
            ) : (
              <Box>
                <Button
                  onClick={auth.logout}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                  component={RouterLink}
                  to={`/`}
                >
                  Log Out
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
