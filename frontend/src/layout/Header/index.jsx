import { NavLink } from 'react-router-dom';
import './index.css';

const Header = () => {
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/" className={({ isActive }) => isActive ? "active-link" : ""}>
                            Accueil
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/contact" className={({ isActive }) => isActive ? "active-link" : ""}>
                            Contact
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
export default Header;