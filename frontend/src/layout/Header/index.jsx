import { NavLink } from 'react-router-dom';
import './index.css';

const Header = () => {
    return (
        <header className="cyber-header">
            <div className="header-logo">
                <NavLink to="/">
                <p className="sys-prompt">PORTFOLIO</p>
                </NavLink>
            </div>

            <nav className="cyber-nav">
                <ul>
                    <li>
                        <NavLink 
                            to="/" 
                            className={({ isActive }) => isActive ? "cyber-link active-link" : "cyber-link"}
                        >
                            <span className="nav-bracket">[</span> ACCUEIL <span className="nav-bracket">]</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/contact" 
                            className={({ isActive }) => isActive ? "cyber-link active-link" : "cyber-link"}
                        >
                            <span className="nav-bracket">[</span> CONTACT <span className="nav-bracket">]</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
export default Header;