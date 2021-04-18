import React from 'react';
import PropTypes from 'prop-types';

Image.propTypes = {
    src: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
};

function Image({ src, caption}) {
    return (
        <div>
            <img src={src} alt="" />
        </div>
    );
}

export default Image;