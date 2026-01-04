import { NavLink } from "react-router-dom";

const Nav = () => {
    return (
        <nav>
            <ul>
                <li>
                    <NavLink to="/admin/create-project">
                        Creer un projet
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/admin/create-presentation">
                        Créer une présentation
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/admin/create-skills">
                        Créer des compétences
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/admin/messages">
                        Messages
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}
export default Nav;