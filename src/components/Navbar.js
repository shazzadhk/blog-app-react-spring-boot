import '../App.css';
import React, {useState} from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import {Link, NavLink} from "react-router-dom";
import {styled} from "@mui/material/styles";
import {alpha} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import MenMenuList from "../categories/MenMenuList";
import WomenMenuList from "../categories/WomenMenuList";
import ElectronicsMenuList from "../categories/ElectronicsMenuList";


const authentication = [
    {
        name: 'Login',
        url: '/login'
    },
    {
        name: 'Signup',
        url: '/signup'
    }
]

const Navbar = () => {

    // For Men Menu
    const [anchorMenMenuEl, setAnchorMenMenuEl] = useState(null);
    const openMenMenu = Boolean(anchorMenMenuEl);

    // For Women Menu
    const [anchorWomenMenuEl, setAnchorWomenMenuEl] = useState(null);
    const openWomenMenu = Boolean(anchorWomenMenuEl);

    // For Electronics Menu
    const [anchorElectronicsMenuEl, setAnchorElectronicsMenuEl] = useState(null);
    const openElectronicsMenu = Boolean(anchorElectronicsMenuEl);

    const handleMenMenuClick = (event) => {
        setAnchorMenMenuEl(event.currentTarget);
    };

    const handleMenMenuClose = () => {
        setAnchorMenMenuEl(null);
    };

    const handleWomenMenuClick = (event) => {
        setAnchorWomenMenuEl(event.currentTarget);
    };

    const handleWomenMenuClose = () => {
        setAnchorWomenMenuEl(null);
    };

    const handleElectronicsMenuClick = (event) => {
        setAnchorElectronicsMenuEl(event.currentTarget);
    };

    const handleElectronicsMenuClose = () => {
        setAnchorElectronicsMenuEl(null);
    };

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: '15px',
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '20ch',
            },
        },
    }));

    const linkStyle ={
        textDecoration: 'none',
        color: 'white'
    }

    return(
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h4"
                        noWrap
                        component="h4"
                        sx={{
                            mr: 3,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.2rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        <Link to="/" style={linkStyle}>Apex</Link>
                    </Typography>

                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <Button
                            onClick={handleMenMenuClick}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                            aria-controls={openMenMenu ? 'men-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={openMenMenu ? "true" : undefined}
                        >
                            Men
                        </Button>
                        <Button
                            onClick={handleWomenMenuClick}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                            aria-controls={openWomenMenu ? 'women-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={openWomenMenu ? "true" : undefined}
                        >
                            Women
                        </Button>
                        <Button
                            onClick={handleElectronicsMenuClick}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                            aria-controls={openElectronicsMenu ? 'electronics-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={openElectronicsMenu ? "true" : undefined}
                        >
                            Electronics
                        </Button>
                        <Button
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            <NavLink to="/product-page/home-decoration" style={linkStyle}>Home Decorator</NavLink>
                        </Button>
                        <Button
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            <NavLink to="/product-page/skincare" style={linkStyle}>Skincare</NavLink>
                        </Button>

                    </Box>

                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>

                    <Box style={{display: 'flex',direction: 'row',justifyContent: 'flex-end',marginLeft: 'auto'}}>

                        {authentication.map((page) => (
                            <Button
                                key={page.name}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                <Link to={page.url} style={linkStyle}>{page.name}</Link>
                            </Button>
                        ))}
                    </Box>
                    <MenMenuList anchorEl={anchorMenMenuEl}
                                 open={openMenMenu}
                                 handleClose={handleMenMenuClose}
                                 menuId="men-menu"
                    />

                    <WomenMenuList anchorEl={anchorWomenMenuEl}
                                 open={openWomenMenu}
                                 handleClose={handleWomenMenuClose}
                                 menuId="women-menu"
                    />
                    <ElectronicsMenuList anchorEl={anchorElectronicsMenuEl}
                                   open={openElectronicsMenu}
                                   handleClose={handleElectronicsMenuClose}
                                   menuId="electronics-menu"
                    />
                </Toolbar>
            </Container>
        </AppBar>
    )
}
export default Navbar;