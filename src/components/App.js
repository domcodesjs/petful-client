import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GlobalStyle from '../GlobalStyle';
import Adoption from './Adoption/Adoption';
import LandingPage from './LandingPage/LandingPage';

const App = () => {
  return (
    <Router>
      <GlobalStyle></GlobalStyle>
      <Switch>
        <Route exact path='/'>
          <LandingPage></LandingPage>
        </Route>
        <Route exact path='/adoption'>
          <Adoption></Adoption>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
