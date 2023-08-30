import {Menu, MenuItem} from "@mui/material";
import React from "react";
import {Link} from "react-router-dom";

const MenMenuList = ({anchorEl,open,handleClose,menuId}) => {

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
                <Link to="/product-page/mens-shirts" style={linkStyle}>Men Shirts</Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
                <Link to="/product-page/mens-shoes" style={linkStyle}>Men Shoes</Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
                <Link to="/product-page/mens-watches" style={linkStyle}>Men Watches</Link>
            </MenuItem>
        </Menu>
    )
}
export default MenMenuList;