import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NotFoundFeature from './components/NotFound';
import './App.css';
import PostFeature from './components/PostFeature'; 
import * as ROUTES from './constants/routes'; 


const Login = lazy(() => import ('./pages/Login'))

function App() {
  return (
    <div className="App">
      <Router>
        <Suspense fallback={<p>Loading...</p>}>
          <Switch>
            {/* <Route to="/" component={ PostFeature } exact /> */}
            <Route path={ROUTES.LOGIN} component={ Login } />

            <Route component={ NotFoundFeature } exact />
          </Switch>
        </Suspense>
      </Router>

    </div>
  );
}

export default App;
