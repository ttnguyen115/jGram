import { Button, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import firebase, { storage, db } from '../../database/firebase';
import PropTypes from 'prop-types';

UploadPost.propTypes = {
    username: PropTypes.string,
};

const useStyles = makeStyles(theme => ({
    root: {
        position: 'fixed',
        bottom: 0,
        width: '100%',
        backgroundColor: '#000',
        color: '#fff',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: '100',
    },

    uploadBtn: {
        color: 'white',
        border: '1px solid white',
    },
}));

function UploadPost({username}) {
    const classes = useStyles();
    const [caption, setCaption] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [progress, setProgress] = useState(0);

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImageUrl(e.target.files[0]);
        }
    };

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${imageUrl.name}`).put(imageUrl);
        uploadTask.on(
            "state_changed",
            
            (snapshot) => {
                // progress function
                const tmpProgress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );

                setProgress(tmpProgress);
            },
            
            (err) => {
                // error function
                console.log(err);
                alert(err.message);
            },

            () => {
                // complete function
                storage.ref('images')
                        .child(imageUrl.name)
                        .getDownloadURL()
                        .then(url => {
                            // post image inside db
                            db.collection('posts').add({
                                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                                caption: caption,
                                imageUrl: url,
                                username: username,
                            })

                        })
            }
        );
    };

    return (
        <div className={classes.root}>
            <input type="text" placeholder="Enter your caption here..." onChange={e => setCaption(e.target.value)} />
            <input type="file" onChange={handleChange} />
            <div>{progress}</div>

            <Button className={classes.uploadBtn} onClick={handleUpload}>
                Upload
            </Button>
        </div>
    );
}

export default UploadPost;