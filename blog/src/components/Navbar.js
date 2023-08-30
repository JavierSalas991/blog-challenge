import React, { useContext, useEffect } from 'react';
import {
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    MenuItem,
    AppBar,
    Container,
    Avatar,
    Tooltip,
} from '@mui/material';
import { Link } from 'react-router-dom';
// import { Menu as MenuIcon } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import DeblurIcon from '@mui/icons-material/Deblur';
import LogoutIcon from '@mui/icons-material/Logout';
import UserContext from '../context/userContext/UserContext';
import { Button } from 'bootstrap';



function ResponsiveAppBar() {
    
    const { user } = useContext(UserContext)
    const pages = user? ['Inicio', 'Mis publicaciones', 'Perfil'] : ['Inicio']

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    useEffect(() => {
        console.log(user);
    }, [user])

    const firstLetters = text => {
        const words = text.split(" ")
        return (words[0][0] + words[1][0]).toUpperCase() || null
    }

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <DeblurIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/inicio"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        BLOG
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
                            {pages.map((page) => (
                                <Link
                                    style={{ color: "black", textDecoration: "none" }}
                                    onClick={handleCloseNavMenu}
                                    to={`/${page.toLowerCase().replace(/\s+/g, '')}`}
                                >
                                    <p style={{ padding: "0 10px" }}>
                                        <Typography > {page}</Typography>
                                    </p>
                                </Link>
                            ))}
                        </Menu>
                    </Box>
                    <DeblurIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        BLOG
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (

                            <Link
                                style={{ color: "#fff", marginLeft: "1rem", textDecoration: "none" }}
                                onClick={handleCloseNavMenu}
                                to={`/${page.toLowerCase().replace(/\s+/g, '')}`}
                            >
                                <Typography textAlign="center"> {page}</Typography>
                            </Link>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        {user ?
                            <Tooltip title="Opciones">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt={user.name} src="/static/images/avatar/2.jpg">{firstLetters(user.name)}</Avatar>
                                </IconButton>
                            </Tooltip>
                            :
                            <div className='d-flex'>
                                <Typography style={{cursor: "pointer"}} className='me-2' textAlign="center">{"Iniciar sesion"}</Typography>
                                <Typography style={{cursor: "pointer"}} textAlign="center">{"Crear cuenta"}</Typography>
                            </div>
                        }

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

                            <MenuItem onClick={handleCloseUserMenu}>
                                <Typography textAlign="right">{"Cerrar sesion"}</Typography>
                            </MenuItem>

                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;