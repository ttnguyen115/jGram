import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import UserContext from '../../context/user';
import FirebaseContext from '../../context/firebase';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';

Actions.propTypes = {
    docId: PropTypes.string.isRequired,
    totalLikes: PropTypes.number.isRequired,
    likedPhoto: PropTypes.bool.isRequired,
    handleFocus: PropTypes.func.isRequired,
};

function Actions({ docId, totalLikes, likedPhoto, handleFocus }) {
    const {
        user: { uid: userId = '' }
    } = useContext(UserContext);
    const [toggleLiked, setToggleLiked] = useState(likedPhoto);
    const [likes, setLikes] = useState(totalLikes);
    const { firebase, FieldValue } = useContext(FirebaseContext);

    const handleToggleLiked = async () => {
        setToggleLiked(toggleLiked => !toggleLiked);

        await firebase
            .firestore()
            .collection('photos')
            .doc(docId)
            .update({
                likes: toggleLiked ? FieldValue.arrayRemove(userId) : FieldValue.arrayUnion(userId)
            })

        setLikes(likes => (toggleLiked ? likes - 1 : likes + 1));
    };

    return (
        <div className="flex justify-between p-4">
            <div className="flex">
                {toggleLiked ? (
                    <FavoriteIcon 
                        className="cursor-pointer mr-5"
                        color="primary" 
                        onClick={handleToggleLiked} 
                    />
                ) : (
                    <FavoriteBorderIcon 
                        className="cursor-pointer mr-5"
                        onClick={handleToggleLiked} 
                    />
                )}

                <ChatBubbleOutlineIcon 
                    onClick={handleFocus}
                    className="cursor-pointer mr-5" 
                />
            </div>

            <div className="p-4 py-0">
                <p className="font-bold">{ likes === 1 ? `${likes} like` : `${likes} likes` }</p>
            </div>
        </div>
    );
}

export default Actions;