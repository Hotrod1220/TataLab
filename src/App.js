import './App.css'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Navigation from './components/common/navigation'
import Home from './components/sections/Home'
import Research from './components/sections/Research'
import People from './components/sections/People'
import Involved from './components/sections/Involved'
import Contact from './components/sections/Contact'
import Footer from './components/common/footer'

function App() {
  return (
    <Router basename="/tatalab">
      <div className="App layout">
        <main>
          <Navigation/>
          <Switch>
            <Route exact path="/">
              <Home/>
            </Route>
            <Route path="/research">
              <Research/>
            </Route>
            <Route path="/people">
              <People/>
            </Route>
            <Route path="/involved">
              <Involved/>
            </Route>
            <Route path="/contact">
              <Contact/>
            </Route>
          </Switch>
          </main>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
