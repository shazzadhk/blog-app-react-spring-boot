import {Menu, MenuItem} from "@mui/material";
import {Link} from "react-router-dom";
import React from "react";

const WomenMenuList = ({anchorEl,menuId,open,handleClose}) => {

    const linkStyle ={
        textDecoration: 'none',
        color: 'black'
    }

    return(
        <Menu
            anchorEl={anchorEl}
            id={menuId}
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            sx={{
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 2,
                '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                },
                '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            <MenuItem onClick={handleClose}>
                <Link to="/product-page/womens-dresses" style={linkStyle}>Women Dresses</Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
                <Link to="/product-page/womens-shoes" style={linkStyle}>Women Shoes</Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
                <Link to="/product-page/womens-watches" style={linkStyle}>Women Watches</Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
                <Link to="/product-page/womens-bags" style={linkStyle}>Women Bags</Link>
            </MenuItem>
        </Menu>
    )
}
export default WomenMenuList;