import './App.css';
import Header from './components/Header';
import PostFeature from './components/PostFeature';
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header />

      <Switch>
        <Route to="/" component={ PostFeature } exact />
      </Switch>

      {/* <Footer />  */}
    </div>
  );
}

export default App;
