import { useEffect, useState } from 'react';
import ProjectCard from '../../components/ProjectCard';
import './index.css';

const Homepage = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [presentation, setPresentation] = useState(null);
    const [skills, setSkills] = useState([]);

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
        fetch('http://localhost:5000/api/skills')
            .then(res => res.json())
            .then(data => {setSkills(data); setLoading(false);})
            .catch(err => console.error(err));
        fetch('http://localhost:5000/api/presentation')
            .then(res => res.json())
            .then(data => {setPresentation(data); setLoading(false);})
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="homepage-content">
            <h1>Mes Projets</h1>
            <div className="presentation">
                {loading ? (
                    <p>Chargement...</p>
                ) : presentation ? (
                    <div>
                        <h3>{presentation.name}</h3>
                        <p>{presentation.description}</p>
                        <p>Contactez-moi à : {presentation.email}</p>
                        <a href="../../assets/Mon_CV.pdf" download="Mon_CV.pdf">Télécharger mon CV</a>
                        <p><a href={presentation.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
                        <p><a href={presentation.github} target="_blank" rel="noopener noreferrer">GitHub</a></p>
                        
                        <h3>Compétences :</h3>
                        <ul>
                            {skills.map(skill => (
                                <li key={skill._id}>{skill.name} - {skill.category}</li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p>Aucune présentation pour le moment.</p>
                )}
            </div>
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