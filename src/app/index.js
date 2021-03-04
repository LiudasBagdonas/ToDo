import './index.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Filter from './pages/Filter';
import Todo from './pages/Todo';
import Projects from './pages/Projects';
import ContentContext from './contexts/ContentContext';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <ContentContext.Provider>
          <Header />
          <Switch>

            <Route exact path="/">
              <Todo />
            </Route>

            <Route exact path="/filter">
              <Filter />
            </Route>

            <Route exact path="/projects" >
              <Projects />
            </Route>

          </Switch>
          <Footer />
        </ContentContext.Provider>
      </Router>
    </div>
  );
}

export default App;
