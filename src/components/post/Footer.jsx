import React from 'react';
import PropTypes from 'prop-types';

Footer.propTypes = {
    caption: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
};

function Footer({ caption, username }) {
    return (
        <div className="p-4 pt-1 pb-0">
            <span className="mr-1 font-bold">{username}</span>
            <span>{caption}</span>
        </div>
    );
}

export default Footer;