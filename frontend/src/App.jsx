import { Routes, Route } from 'react-router-dom';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Homepage from './pages/Homepage';
import Contact from './pages/Contactpage';
import Loginpage from './pages/Loginpage';
import Adminpage from './pages/Adminpage';
import CreateProject from './pages/Adminpage/Create/CreateProject';
import CreatePresentation from './pages/Adminpage/Create/CreatePresentation';
import CreateSkills from './pages/Adminpage/Create/CreateSkills';
import CreateExperience from './pages/Adminpage/Create/CreateExperience';
import UpdatePresentation from './pages/Adminpage/Update/UpdatePresentation';
import UpdateProject from './pages/Adminpage/Update/UpdateProject';
import UpdateSkills from './pages/Adminpage/Update/UpdateSkills';
import UpdateExperience from './pages/Adminpage/Update/UpdateExperience';
import Messagepage from './pages/Adminpage/Messagepage';
import Exppage from './pages/Exppage';
import NotFound from './pages/NotFound';
// Décommenter pour pouvoir creer un admin
// import Signup from './pages/Signup';
import './App.css';
  
function App() {
  return (
    <div className="app-layout">
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/admin" element={<Adminpage />} />
          <Route path="/admin/create-project" element={<CreateProject />} />
          <Route path="/admin/create-presentation" element={<CreatePresentation />} />
          <Route path="/admin/create-skills" element={<CreateSkills />} />
          <Route path="/admin/create-experience" element={<CreateExperience />} />
          <Route path="/admin/messages" element={<Messagepage />} />
          <Route path="/admin/update-presentation" element={<UpdatePresentation />} />
          <Route path="/admin/update-project/:id" element={<UpdateProject />} />
          <Route path="/admin/update-skill/:id" element={<UpdateSkills />} />
          <Route path="/admin/update-experience/:id" element={<UpdateExperience />} />
          <Route path="/login" element={<Loginpage />} />
          {/* Décommenter pour pouvoir creer un admin */}
          {/* <Route path="/signup" element={<Signup />} /> */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/experience" element={<Exppage />} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App;