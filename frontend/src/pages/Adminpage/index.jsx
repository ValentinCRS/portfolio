import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Adminpage = () => {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
        fetch('http://localhost:5000/api/projects')
            .then(data => {
                setProjects(data);
            })
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

    return (
        <div className="adminpage">
            <h2>Page Admin HEHEHEHEHE</h2>
            <ul>
                {projects.map(proj => (
                    <li key={proj._id}>{proj.title}</li>
                ))}
            </ul>
            <button onClick={handleLogout}>Se déconnecter</button>
        </div>
    );
}

export default Adminpage;