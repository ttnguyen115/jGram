import { Button, InputBase, makeStyles, Modal } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import SearchIcon from '@material-ui/icons/Search';
import { default as React, useEffect, useState } from 'react';
import LogInFeature from '../../auth/components/LogInFeature';
import SignUpFeature from '../../auth/components/SignUpFeature';
import { auth } from '../../database/firebase';
import jgramLogo from '../../jgramLogo.png';
import PropTypes from 'prop-types';

Header.propTypes = {
    displayUsername: PropTypes.func,
};

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
    const [signUp, setSignUp] = useState(false);
    const [logIn, setLogIn] = useState(false);
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState('');

    // const [anchorEl, setAnchorEl] = useState(null);
    // const open = Boolean(anchorEl);
    
    // const handleClose = () => {
    //     setAnchorEl(null);
    // };

    // const handleMenu = (event) => {
    //     setAnchorEl(event.currentTarget);
    // };

    const handleSignUpClick = () => {
        setSignUp(true);
    };

    const handleSignUpClose = () => {
        setSignUp(false);
    };

    const handleLogInClick = () => {
        setLogIn(true);
    };

    const handleLogInClose = () => {
        const {displayUsername} = props;
        if (displayUsername) {
            displayUsername(username);
        }

        setLogIn(false);
    };
    
    // Log in or Sign up
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                // If user log in
                setUser(authUser);
                setUsername(authUser.displayName);
                console.log(username);
            } else {
                // If user log out
                setUser(null);
            }
        });

        return () => {
            unsubscribe();
        }
    }, [user, username]);

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

            {/* Icons Bar (Notifications - Message - User Settings) */}

            {/* <Box className={classes.iconsContainer}>
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
            </Box> */}

            {/* Sign up / Log in */}
            {user ? (
                <Button color="inherit" onClick={() => auth.signOut()}>Log Out</Button>
            ) : (
                <Box>
                    <Button color="inherit" onClick={handleSignUpClick}>Sign Up</Button>
                    <Button color="inherit" onClick={handleLogInClick}>Log In</Button>
                </Box>
            )}

            <Modal
                open={signUp}
                onClose={() => setSignUp(false)}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <SignUpFeature closeModal={handleSignUpClose} />
            </Modal>

            <Modal
                open={logIn}
                onClose={() => setLogIn(false)}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <LogInFeature closeModal={handleLogInClose} />
            </Modal>
        </Box>
    );
}

export default Header;