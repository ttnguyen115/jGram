import { Box } from '@material-ui/core';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import NotFoundFeature from './components/NotFound';
import PostFeature from './components/PostFeature';

function App() {
  return (
    <Box className="App">
      <Header />

      <Switch>
        <Route to="/" component={ PostFeature } exact />

        <Route component={ NotFoundFeature } exact />
      </Switch>

      {/* <Footer />  */}
    </Box>
  );
}

export default App;
