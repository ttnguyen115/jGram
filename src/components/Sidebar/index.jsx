import useUser from '../../hooks/useUser';
import Suggestions from './Suggestions';
import User from './User';

export default function Sidebar() {
    const { user: { docId = '', fullName, username, userId, following } = {} } = useUser();
    
    return (
        <div className="p-4">
            <User username={username} fullName={fullName} />
            <Suggestions userId={userId} following={following} loggedInUserDocId={docId} />
        </div>
    );
}

// Sidebar.whyDidYouRender = true;