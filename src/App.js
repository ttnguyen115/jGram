import { Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import NotFoundFeature from './components/NotFound';
import PostFeature from './components/PostFeature';
import UploadPost from './components/UploadFeature/UploadPost';

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
