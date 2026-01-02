import { Routes, Route } from 'react-router-dom';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Homepage from './pages/Homepage';
import Contact from './pages/Contactpage';
import Loginpage from './pages/Loginpage';
import Adminpage from './pages/Adminpage';
import './App.css';
  
function App() {
  return (
    <div className="app-container">
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/admin" element={<Adminpage />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App;