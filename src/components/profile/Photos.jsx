import React from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';

Photos.propTypes = {
     photos: PropTypes.array.isRequired,
};

function Photos({ photos }) {
    return (
        <div className="h-16 border-t border-gray-primary mt-12 pt-4">
            <div className="grid grid-cols-3 mt-4 mb-12 gap-8">
                {!photos ? (
                    <>
                        <Skeleton count={12} width={320} height={400} /> 
                    </>
                ) : photos.length > 0 ? (
                    photos.map(photo => (
                        <div key={photo.docId} className="relative group">
                            <img src={photo.imageSrc} alt={photo.caption} className=""/>

                            <div className="absolute bottom-0 left-0 bg-gray-200 z-10 w-full justify-evenly items-center h-full bg-black-faded group-hover:flex hidden">
                                <p className="flex items-center text-white font-bold">
                                    <FavoriteIcon color="secondary" className="mx-2"/>
                                    {photo.likes.length}
                                </p>
                                
                                <p className="flex items-center text-white font-bold">
                                    <ChatBubbleIcon color="secondary" className="mx-2"/>
                                    {photo.comments.length}
                                </p>
                            </div>
                        </div>
                    ))
                ) : null }
            </div>

            {!photos || (photos.length === 0 && <p className="text-center text-2xl">No Posts Yet</p>)}
        </div>
    );
}

export default Photos;