import { IconButton, InputBase, Menu, MenuItem } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import SearchIcon from '@material-ui/icons/Search';
import React from 'react';
import jgramLogo from '../../jgramLogo.png';
import './style.scss';

Header.propTypes = {};

function Header(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    return (
        <Box className="root">
            <a href="http://localhost:3000/"><img src={jgramLogo} alt="jgramLogo" /></a>

            <div className="search">
                <div className="searchIcon">
                    <SearchIcon />
                </div>

                <InputBase
                    placeholder="Search…"
                    className="inputRoot inputInput"
                    inputProps={{ 'aria-label': 'search' }}
                />
            </div>

            <Box className="icons__container">
                <IconButton>
                    <FavoriteBorderIcon  className="header__icon"/>
                </IconButton>


                <IconButton>
                    <ChatBubbleOutlineIcon  className="header__icon"/>
                </IconButton>

                <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                >
                    <AccountCircleIcon  className="header__icon"/>
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={open}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                </Menu>
            </Box>
        </Box>
    );
}

export default Header;