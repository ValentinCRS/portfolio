import { NavLink } from "react-router-dom";
import './index.css'

const Nav = () => {
    return (
        <nav className="cyber-admin-nav">
            <ul className="cyber-admin-nav-list">
                <li>
                    <NavLink 
                        to="/admin"
                        className={({ isActive }) => isActive ? "cyber-admin-nav-link active" : "cyber-admin-nav-link"}
                    >
                        <span className="sys-prompt">+</span> PAGE ADMIN
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/admin/create-project"
                        className={({ isActive }) => isActive ? "cyber-admin-nav-link active" : "cyber-admin-nav-link"}
                    >
                        <span className="sys-prompt">+</span> CREER_PROJET
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/admin/create-presentation"
                        className={({ isActive }) => isActive ? "cyber-admin-nav-link active" : "cyber-admin-nav-link"}
                    >
                        <span className="sys-prompt">+</span> CREER_PRESENTATION
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/admin/create-skills"
                        className={({ isActive }) => isActive ? "cyber-admin-nav-link active" : "cyber-admin-nav-link"}
                    >
                        <span className="sys-prompt">+</span> CREER_COMPETENCES
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/admin/create-experience"
                        className={({ isActive }) => isActive ? "cyber-admin-nav-link active" : "cyber-admin-nav-link"}
                    >
                        <span className="sys-prompt">+</span> CREER_EXPERIENCE
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/admin/messages"
                        className={({ isActive }) => isActive ? "cyber-admin-nav-link active" : "cyber-admin-nav-link"}
                    >
                        <span className="sys-prompt">&gt;</span> MESSAGES_RECUS
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}
export default Nav;