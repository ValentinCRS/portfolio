import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../../components/AdminNav";
import ProjectCard from "../../components/ProjectCardAdmin";
import "./index.css";

const Adminpage = () => {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [skills, setSkills] = useState([]);
    const [presentation, setPresentation] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
        fetch('http://localhost:5000/api/projects')
            .then(res => res.json())
            .then(data => setProjects(data))
            .catch(err => console.error(err));
        fetch('http://localhost:5000/api/skills')
            .then(res => res.json())
            .then(data => setSkills(data))
            .catch(err => console.error(err));
        fetch('http://localhost:5000/api/presentation')
            .then(res => res.json())
            .then(data => setPresentation(data))
            .catch(err => console.error(err));

    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

    const handleDelete = async (id) => {
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`http://localhost:5000/api/projects/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                setProjects(currentProjects => currentProjects.filter(proj => proj._id !== id));
            } else {
                alert("Erreur lors de la suppression");
            }
        } catch (error) {
            console.error("Erreur delete:", error);
        }
    };

    return (
        <div className="adminpage">
            <h2>
                Page Admin
                <a onClick={handleLogout}>Se déconnecter</a>
            </h2>

            <Nav />

            <div className="presentation-section">
                {presentation ? (
                    <>
                        <h3>Présentation</h3>
                        <p>{presentation.name}</p>
                        <p>{presentation.description}</p>
                        <button onClick={() => navigate("/admin/update-presentation")}>Editer la présentation</button>
                    </>
                ) : (
                    <p>Aucune présentation pour le moment.</p>
                )}
            </div>
            <div className="skills-list">
                {skills.length > 0 ? (
                    skills.map(skill => (
                        <button className="skills-list-boutton" key={skill._id} onClick={() => navigate(`/admin/update-skill/${skill._id}`)}>
                            {skill.name}
                        </button>
                    ))
                ) : (
                    <p>Aucune compétence pour le moment.</p>
                )}
            </div>

            <div className="projects-section">
                <h2>Mes Projets</h2>
                <div className="projects-grid">
                    {projects.length > 0 ? (
                        projects.map((proj) => (
                            <ProjectCard key={proj._id} project={proj} onDelete={() => handleDelete(proj._id)}/>
                        ))
                    ) : (
                        <p>Aucun projet pour le moment.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Adminpage;