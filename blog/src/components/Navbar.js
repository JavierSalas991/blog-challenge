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
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import DeblurIcon from '@mui/icons-material/Deblur';
import UserContext from '../context/userContext/UserContext';
import Swal from 'sweetalert2';
import { firstLetters } from '../helpers/helper';

function ResponsiveAppBar() {

    const navigate = useNavigate()
    const location = useLocation()
    const path = location.pathname

    const { user, setUserWithCookie } = useContext(UserContext)

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

    const cerrarSesion = () => {
        Swal.fire({
            html: '¿Seguro que desea  cerrar sesión?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#2c5884',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Salir',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                setUserWithCookie(null)
                window.location = "/"
            }
        })
    }

    return (
        <AppBar position="fixed">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <DeblurIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
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

                            <Link
                                style={{ color: "black", textDecoration: "none" }}
                                onClick={handleCloseNavMenu}
                                to={"/"}
                            >
                                <p style={{ padding: "15px 40px 0 20px" }}>
                                    <Typography >Inicio</Typography>
                                </p>
                            </Link>
                            {user &&
                                <Link
                                    style={{ color: "black", textDecoration: "none" }}
                                    onClick={handleCloseNavMenu}
                                    to={"/profile/" + user.id}
                                >
                                    <p style={{ padding: "0 30px 0 15px" }}>
                                        <Typography >Perfil</Typography>
                                    </p>
                                </Link>
                            }

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
                        {user &&
                            <>
                                <Link
                                    style={{ color: "#fff", marginLeft: "1rem", textDecoration: "none" }}
                                    onClick={handleCloseNavMenu}
                                    to={"/"}
                                >
                                    <Typography textAlign="center">Inicio</Typography>
                                </Link>
                                <Link
                                    style={{ color: "#fff", marginLeft: "1rem", textDecoration: "none" }}
                                    onClick={handleCloseNavMenu}
                                    to={"/profile/" + user.id}
                                >
                                    <Typography textAlign="center">Mis publicaciones</Typography>
                                </Link>
                            </>
                        }
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        {user ?
                            <Tooltip title={user.name}>
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt={user.name} src="/static/images/avatar/2.jpg">{firstLetters(user.name)}</Avatar>
                                </IconButton>
                            </Tooltip>
                            :
                            <>
                                <div className='d-md-none'>
                                    <Tooltip title="Usuario">
                                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                            <Avatar src="/static/images/avatar/2.jpg"></Avatar>
                                        </IconButton>
                                    </Tooltip>
                                </div>
                                <div className='d-none d-md-block'>
                                    <div className=' d-flex'>
                                        {path !== "/login" && <Typography onClick={() => navigate("/login")} style={{ cursor: "pointer" }} className='me-2' textAlign="center">{"Iniciar sesion"}</Typography>}
                                        {path !== "/register" && <Typography onClick={() => navigate("/register")} style={{ cursor: "pointer" }} textAlign="center">{"Crear cuenta"}</Typography>}
                                    </div>
                                </div>
                            </>
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
                            <div onClick={handleCloseUserMenu}>
                                {user ?
                                    < MenuItem>
                                        <Typography onClick={cerrarSesion} textAlign="right">{"Cerrar sesion"}</Typography>
                                    </MenuItem>
                                    :
                                    <>
                                        < MenuItem>
                                            <Typography onClick={() => navigate("/login")} textAlign="right">{"Iniciar Sesion"}</Typography>
                                        </MenuItem>
                                        < MenuItem>
                                            <Typography onClick={() => navigate("/register")} textAlign="right">{"Registrarse"}</Typography>
                                        </MenuItem>
                                    </>
                                }
                            </div>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;