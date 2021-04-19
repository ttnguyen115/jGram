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

            <div className="flex md:grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg pt-20">
                <Timeline />
                <Sidebar /> 
            </div>
        </div>
    );
}

export default Dashboard;