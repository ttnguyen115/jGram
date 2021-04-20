import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import FirebaseContext from '../../context/firebase';

UploadPost.propTypes = {
    user: PropTypes.object.isRequired,
};

function UploadPost({user}) {
    const { firebase } = useContext(FirebaseContext);
    const [imageSrc, setImageSrc] = useState('');
    const [progress, setProgress] = useState(0);
    const [caption, setCaption] = useState('');

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImageSrc(e.target.files[0]);
        }
    }
    
    const handleUpload = () => {
        const uploadTask = firebase
            .storage()
            .ref(`images/${imageSrc.name}`)
            .put(imageSrc);

        uploadTask.on(
            "state_changed",
            
            (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgress(progress);
            },
            
            (err) => {
                console.log(err);
            },
            // Complete func
            () => {
                firebase
                    .storage()
                    .ref('images')
                    .child(imageSrc.name)
                    .getDownloadURL() 
                    .then(src => {
                        firebase
                            .firestore()
                            .collection('photos')
                            .add({
                                dateCreated: Date.now(),
                                caption: caption,
                                imageSrc: src,
                                username: user.displayName.toLowerCase(),
                                comments: [],
                                likes: [],
                                userId: user.uid,
                                userLatitude: '40.7128°',
                                userLongitude: '74.0060°',
                            })

                        setProgress(0);
                        setCaption('');
                        setImageSrc('');
                    })
            }
        );
    }

    return (
        <div className="flex flex-col ">
            <progress className="w-full" value={progress} max="100" />

            <div className="flex">
                <input type="text" placeholder="Enter a caption" value={caption} onChange={e => setCaption(e.target.value)} />
                <input type="file" onChange={handleChange} />
                <Button variant="contained" color="primary" onClick={handleUpload}>
                    Upload
                </Button>
            </div>

        </div>
    );
}

export default UploadPost;