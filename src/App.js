import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css'; 
import * as ROUTES from './constants/routes'; 
import useAuthListener from './hooks/useAuthListener';
import UserContext from './context/user';

import ProtectedRoute from './helpers/ProtectedRoute';
import IsUserLoggedIn from './helpers/IsUserLoggedIn';

const Login = lazy(() => import ('./pages/Login'));
const Signup = lazy(() => import ('./pages/Signup'));
const Dashboard = lazy(() => import ('./pages/Dashboard'));
const Profile = lazy(() => import ('./pages/Profile'));
const NotFound = lazy(() => import ('./pages/NotFound'));

function App() {
  const { user } = useAuthListener();

  return (
    <div className="App">
      <UserContext.Provider value={{ user }}>
        <Router>
          <Suspense fallback={<p>Loading...</p>}>
            <Switch>
              <IsUserLoggedIn user={user} loggedInPath={ROUTES.DASHBOARD} path={ROUTES.LOGIN}>
                <Login />
              </IsUserLoggedIn>

              <IsUserLoggedIn user={user} loggedInPath={ROUTES.DASHBOARD} path={ROUTES.SIGNUP}>
                <Signup />
              </IsUserLoggedIn>
              
              <ProtectedRoute user={user} path={ROUTES.DASHBOARD} exact>
               <Dashboard />
              </ProtectedRoute>

              <Route path={ROUTES.PROFILE} component={ Profile } />
              
              <Route component={ NotFound } />
            </Switch>
          </Suspense>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
