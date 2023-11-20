import './App.css'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Navigation from './components/common/navigation'
import Home from './components/sections/Home'
import Research from './components/sections/Research'
import People from './components/sections/People'
import Involved from './components/sections/Involved'
import Contact from './components/sections/Contact'
import Footer from './components/common/footer'
import Admin from './components/sections/Admin'
import NotFound from './components/sections/NotFound'
import Projects from './components/common/admin/projects'
import PeopleAd from './components/common/admin/people'
import AddProject from './components/common/admin/addProject'
import AddPerson from './components/common/admin/addPerson'
import Extra from './components/common/extra'
import EditProject from './components/common/admin/editProject'
import EditPerson from './components/common/admin/editPerson'
import Auth from './components/common/auth'
import Resume from './components/common/admin/resume'

function App() {
  return (
    <Router basename="/tatalab">
      <div className="App layout">
        <main>
          <Navigation/>
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route path="/research" element={<Research/>}/>
            <Route path="/people" element={<People/>}/>
            <Route path="/involved" element={<Involved/>}/>
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/auth" element={<Auth/>}/>
            <Route path="/admin" element={<Admin/>}>
              <Route index element={<Extra/>}/>
              <Route path="projects" element={<Projects/>}/>
                <Route path="projects/add" element={<AddProject/>}/>
                <Route path="projects/:id" element={<EditProject/>}/>
              <Route path="people" element={<PeopleAd/>}/>
                <Route path="people/add" element={<AddPerson/>}/>
                <Route path="people/:id" element={<EditPerson/>}/>
                <Route path="people/resume" element={<Resume/>}/>
              <Route path="*" element={<NotFound/>}/>
            </Route>
            <Route path="*" element={<NotFound/>}/>
          </Routes>
        </main>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
