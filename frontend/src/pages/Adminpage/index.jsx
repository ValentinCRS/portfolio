import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../../components/AdminNav";
import ProjectCard from "../../components/ProjectCardAdmin";
import ExpCardAdmin from "../../components/ExpCardAdmin";
import "./index.css";

const Adminpage = () => {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [skills, setSkills] = useState([]);
    const [experience, setExperience] = useState([]);
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
        fetch('http://localhost:5000/api/experiences')
            .then(res => res.json())
            .then(data => setExperience(data))
            .catch(err => console.error(err));

    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

    const handleDeleteProjet = async (id) => {
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

    const handleDeleteExperience = async (id) => {
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`http://localhost:5000/api/experiences/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                setExperience(currentExperience => currentExperience.filter(exp => exp._id !== id));
            } else {
                alert("Erreur lors de la suppression");
            }
        } catch (error) {
            console.error("Erreur delete:", error);
        }
    };

    return (
        <div className="cyber-admin-page">
            <div className="cyber-admin-header">
                <h2>
                    <span className="sys-prompt">root@system:</span> PAGE_ADMIN
                </h2>
                <button className="cyber-logout-btn" onClick={handleLogout}>
                    [X] DECONNEXION
                </button>
            </div>

            <div className="cyber-admin-nav-wrapper">
                <Nav />
            </div>

            <div className="cyber-admin-panel">
                {presentation ? (
                    <>
                        <h3 className="cyber-panel-title">SYS.PRESENTATION</h3>
                        <p className="cyber-text-highlight">{presentation.name}</p>
                        <p className="cyber-text-dim">{presentation.description}</p>
                        <button className="cyber-action-btn" onClick={() => navigate("/admin/update-presentation")}>
                            EDITER_PRESENTATION
                        </button>
                    </>
                ) : (
                    <p className="cyber-error">AUCUNE_PRESENTATION_TROUVEE</p>
                )}
            </div>

            <div className="cyber-admin-panel">
                <h3 className="cyber-panel-title">SYS.COMPETENCES</h3>
                <div className="cyber-admin-skills">
                    {skills.length > 0 ? (
                        skills.map(skill => (
                            <button 
                                className="cyber-admin-skill-btn" 
                                key={skill._id} 
                                onClick={() => navigate(`/admin/update-skill/${skill._id}`)}
                            >
                                {skill.name}
                            </button>
                        ))
                    ) : (
                        <p className="cyber-error">AUCUNE_COMPETENCE_TROUVEE</p>
                    )}
                </div>
            </div>

            <div className="cyber-admin-panel cyber-admin-projects">
                <h2 className="cyber-panel-title">BASE_DE_DONNEES.EXPERIENCES</h2>
                <div className="cyber-admin-projects-grid">
                    {experience.length > 0 ? (
                        experience.map((exp) => (
                            <ExpCardAdmin 
                                key={exp._id} 
                                experience={exp} 
                                onDelete={() => handleDeleteExperience(exp._id)}
                            />
                        ))
                    ) : (
                        <p className="cyber-error">AUCUNE_EXPERIENCE_TROUVEE</p>
                    )}
                </div>
            </div>

            <div className="cyber-admin-panel cyber-admin-projects">
                <h2 className="cyber-panel-title">BASE_DE_DONNEES.PROJETS</h2>
                <div className="cyber-admin-projects-grid">
                    {projects.length > 0 ? (
                        projects.map((proj) => (
                            <ProjectCard 
                                key={proj._id} 
                                project={proj} 
                                onDelete={() => handleDeleteProjet(proj._id)}
                            />
                        ))
                    ) : (
                        <p className="cyber-error">AUCUN_PROJET_TROUVE</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Adminpage;