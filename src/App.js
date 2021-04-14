import { Route, Switch } from 'react-router-dom';
import './App.css';
import NotFoundFeature from './components/NotFound';
import PostFeature from './components/PostFeature';

function App() {
  return (
    <div className="App">

      <Switch>
        <Route to="/" component={ PostFeature } exact />

        <Route component={ NotFoundFeature } exact />
      </Switch>

    </div>
  );
}

export default App;
