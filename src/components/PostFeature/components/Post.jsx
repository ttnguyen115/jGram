import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Box, IconButton, makeStyles, Paper, Typography } from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import CommentIcon from '@material-ui/icons/Comment';
import ShareIcon from '@material-ui/icons/Share';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';

Post.propTypes = {
    post: PropTypes.object,
};

const useStyles = makeStyles(theme => ({
    postContainer: {
        justifyContent: 'left',
        margin: '20px 0',
    },
    
    postHeader: {
        alignItems: 'center',
        display: 'flex',
        padding: '15px',
    },

    icon: {
        width: '30px',
        height: '30px',
        fontSize: '1rem',
        marginRight: '0.8rem',
    },

    userName: {
        fontWeight: 'bold',
        fontSize: '0.9rem',
    },

    postTitle: {
        fontWeight: 'bold',
        fontSize: '20px',
    },
    
    postBody: {
        padding: '1em',
        textAlign: 'left',
    },

    postReact: {
        display: 'flex',
        justifyContent: 'flex-start',
        marginLeft: '0.3rem',
    }
}));

function Post({post}) {
    const classes = useStyles();

    return (
        <Box>
            <Paper elevation={2} className={classes.postContainer}>
                    <Box>
                        <Box className={classes.postHeader}>
                            <Avatar src="/static/images/avatar/1.jpg" className={classes.icon} />
                            <Typography className={classes.userName}>{post.userId}</Typography>
                        </Box>

                        <Box className={classes.postTitle}>{post.title}</Box>

                        <Box className={classes.postBody}>{post.body}</Box>

                        <Box className={classes.postReact}>
                            <IconButton>
                                <FavoriteBorderIcon />
                            </IconButton>

                            <IconButton>
                                <CommentIcon />
                            </IconButton>

                            <IconButton>
                                <ShareIcon />
                            </IconButton>
                            
                            <IconButton>
                                <BookmarkBorderIcon />
                            </IconButton>
                        </Box>
                    </Box>
            </Paper>
        </Box>
    );
}

export default Post;