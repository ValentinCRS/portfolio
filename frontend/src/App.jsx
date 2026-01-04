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
import UpdatePresentation from './pages/Adminpage/Update/UpdatePresentation';
import UpdateProject from './pages/Adminpage/Update/UpdateProject';
import UpdateSkills from './pages/Adminpage/Update/UpdateSkills';
import Messagepage from './pages/Adminpage/Messagepage';
import './App.css';
  
function App() {
  return (
    <div div className="app-layout">
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/admin" element={<Adminpage />} />
          <Route path="/admin/create-project" element={<CreateProject />} />
          <Route path="/admin/create-presentation" element={<CreatePresentation />} />
          <Route path="/admin/create-skills" element={<CreateSkills />} />
          <Route path="/admin/messages" element={<Messagepage />} />
          <Route path="/admin/update-presentation" element={<UpdatePresentation />} />
          <Route path="/admin/update-project/:id" element={<UpdateProject />} />
          <Route path="/admin/update-skill/:id" element={<UpdateSkills />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App;