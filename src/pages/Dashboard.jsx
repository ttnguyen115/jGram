import React, { useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar/index';
import Timeline from '../components/Timeline';

function Dashboard(props) {
    useEffect(() => {
        document.title = 'jGram Welcome!!!';

    }, []);

    return (
        <div className="bg-gray-background">
            <Header />

            <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
                <Timeline />
                <Sidebar /> 
            </div>
        </div>
    );
}

export default Dashboard;