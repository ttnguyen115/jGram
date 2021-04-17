import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NotFoundFeature from './components/NotFound';
import './App.css'; 
import * as ROUTES from './constants/routes'; 


const Login = lazy(() => import ('./pages/Login'));
const Signup = lazy(() => import ('./pages/Signup'));

function App() {
  return (
    <div className="App">
      <Router>
        <Suspense fallback={<p>Loading...</p>}>
          <Switch>
            <Route path={ROUTES.SIGNUP} component={ Signup } exact />
            <Route path={ROUTES.LOGIN} component={ Login } exact />

            <Route component={ NotFoundFeature } exact />
          </Switch>
        </Suspense>
      </Router>

    </div>
  );
}

export default App;
