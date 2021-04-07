import { IconButton, InputBase, makeStyles, Menu, MenuItem } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import SearchIcon from '@material-ui/icons/Search';
import React from 'react';
import jgramLogo from '../../jgramLogo.png';

Header.propTypes = {};

const useStyles = makeStyles(theme => ({
    root: {
        borderBottom: '1px solid #000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        position: 'fixed',
        width: '100%',
        flexGrow: 1,
        zIndex: 100,
        backgroundColor: '#fff',
        height: '69px',

        'root > a': {
            textDecoration: 'none',
        },
    },

    img: {
        objectFit: 'contain',
        width: '10ch',
    },

    icons: {
        color: '#000',
    },

    iconsContainer: {
        display: 'flex',
        justifyContent: 'space-between',
    },

    search: {
        display: 'flex',
        position: 'relative',
        border: '1px solid #000',
        borderRadius: '5px',
        marginLeft: 0,
        width: '20%',
    },

    searchIcon: {
        padding: '0 8px',
        position: 'relative',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    inputSearch: {
        color: 'inherit',
        width: '100%',
    },
}));

function Header(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    return (
        <Box className={classes.root}>
            <a href="http://localhost:3000/"><img src={jgramLogo} alt="jgramLogo" className={classes.img} /></a>

            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>

                <InputBase
                    placeholder="Search…"
                    className={classes.inputSearch}
                    inputProps={{ 'aria-label': 'search' }}
                />
            </div>

            <Box className={classes.iconsContainer}>
                <IconButton>
                    <FavoriteBorderIcon  className={classes.icons}/>
                </IconButton>


                <IconButton>
                    <ChatBubbleOutlineIcon  className={classes.icons}/>
                </IconButton>

                <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                >
                    <AccountCircleIcon  className={classes.icons}/>
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