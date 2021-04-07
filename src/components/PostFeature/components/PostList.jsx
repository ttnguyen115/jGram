import { Box, Container, makeStyles } from '@material-ui/core';
import { default as PropTypes, default as React } from 'react';
import Post from '../components/Post';

PostList.propTypes = {
    data: PropTypes.array,
};

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        textAlign: 'center',
        marginTop: '70px',
    },
    
    progress: {
        color: '#000',
    },
}));

function PostList({data = []}) {
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <Container className={classes.container} maxWidth="md" >

                { data.map(post => (<Post key={post.id} post={post} />)) }

            </Container>
        </Box>
    );
}

export default PostList;