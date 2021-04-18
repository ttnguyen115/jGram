import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import FirebaseContext from '../../context/firebase';
import UserContext from '../../context/user';

AddComment.propTypes = {
    docId: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
    setComments: PropTypes.func.isRequired,
    commentInput: PropTypes.object.isRequired,
};

function AddComment({ docId, comments, setComments, commentInput }) {
    const [comment, setComment] = useState('');  
    const { firebase, FieldValue } = useContext(FirebaseContext);
    const { user: { displayName} } = useContext(UserContext);

    const handleSubmitComment = (e) => {
        e.preventDefault();

        setComments([{ displayName, comment }, ...comments]);
        setComment('');

        return firebase
            .firestore()
            .collection('photos')
            .doc(docId)
            .update({
                comments: FieldValue.arrayUnion({ displayName, comment })
            });
    };

    return (
        <div className="rounded border border-gray-primary mt-4">
            <form 
                className="flex justify-between pl-0 pr-5" 
                method="POST"
                onSubmit={(e) => {comment.length >= 1 ? handleSubmitComment(e) : e.preventDefault()}}
            >
                <input 
                    aria-label="Add a comment"
                    autoComplete="off"
                    type="text" 
                    className="text-sm text-gray-base w-full mr-3 py-5 px-4"
                    name="add-comment"
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={({ target }) => setComment(target.value)}
                    ref={commentInput}
                />

                <button 
                    className={`text-sm font-bold text-blue-medium ${!comment && 'opacity-25'}`}
                    type="button"
                    disabled={comment.length < 1}
                    onClick={handleSubmitComment}
                >
                    Post
                </button>
            </form>
        </div>
    );
}

export default AddComment;