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
        <div className="cyber-homepage">
            
            <div className="cyber-presentation-panel">
                {loading ? (
                    <p className="cyber-loading">SCANNING_DATA...</p>
                ) : presentation ? (
                    <div className="cyber-profile-data">
                        <h2 className="cyber-name">
                            <span className="sys-prompt">ID:</span> {presentation.name}
                        </h2>
                        
                        <p className="cyber-desc">{presentation.description}</p>
                        
                        <p className="cyber-contact">
                            COM_LINK: <span className="highlight">{presentation.email}</span>
                        </p>
                        
                        <div className="cyber-action-links">
                            <a href="../../assets/Mon_CV.pdf" download="Mon_CV.pdf" className="cyber-btn">DOWNLOAD_CV</a>
                            <a href={presentation.linkedin} target="_blank" rel="noopener noreferrer" className="cyber-btn">LINKEDIN</a>
                            <a href={presentation.github} target="_blank" rel="noopener noreferrer" className="cyber-btn">GITHUB</a>
                        </div>
                        
                        <h3 className="cyber-skills-title">SKILLS</h3>
                        <ul className="cyber-skills-list">
                            {skills.map(skill => (
                                <li key={skill._id} className="cyber-skill-tag">
                                    <span className="skill-cat">[{skill.category}]</span> {skill.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p className="cyber-error">NO_PROFILE_DATA_FOUND</p>
                )}
            </div>

            <h1 className="cyber-title"><span className="sys-prompt">_&gt;</span> MES PROJETS</h1>
            
            <div className="cyber-projects-grid">
                {loading ? (
                    <p className="cyber-loading">LOADING_MODULES...</p>
                ) : projects.length > 0 ? (
                    projects.map(proj => <ProjectCard key={proj._id} project={proj} />)
                ) : (
                    <p className="cyber-error">NO_PROJECTS_FOUND</p>
                )}
            </div>
            
        </div>
    );
}
export default Homepage;