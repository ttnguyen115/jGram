import React, { useEffect } from 'react';
import Header from '../components/Header';

function NotFound(props) {
    useEffect(() => {
        document.title = 'Not Found!!!';
    }, [])

    return (
        <div className="bg-gray-background">
            <Header />

            <div className="mx-auth max-w-large-lg pt-20">
                <p className="text-center text-2xl">Page Not Found</p>
            </div>
        </div>
    );
}

export default NotFound;