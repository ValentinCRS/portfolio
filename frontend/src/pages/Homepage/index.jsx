import { useEffect, useState } from 'react';
import ProjectCard from '../../components/ProjectCard';
import './index.css';

const Homepage = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5000/api/projects') 
            .then(response => {
                if (!response.ok) throw new Error("Erreur réseau");
                return response.json();
            })
            .then(data => {
                setProjects(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Erreur :', error);
                setLoading(false);
            });
    }, []);

    return (
        <div className="homepage-content">
            <h1>Mes Projets</h1>
            
            <div className="projects-grid">
                {loading ? (
                    <p>Chargement...</p>
                ) : projects.length > 0 ? (
                    projects.map(proj => <ProjectCard key={proj._id} project={proj} />)
                ) : (
                    <p>Aucun projet pour le moment.</p>
                )}
            </div>
        </div>
    );
}
export default Homepage;