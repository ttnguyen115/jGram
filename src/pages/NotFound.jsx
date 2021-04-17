import React, { useEffect } from 'react';

function NotFound(props) {
    useEffect(() => {
        document.title = 'Not Found!!!';
    }, [])

    return (
        <div className="bg-gray-background">
            <div className="mx-auth max-w-large-lg">
                <p className="text-center text-2xl">Page Not Found</p>
            </div>
        </div>
    );
}

export default NotFound;