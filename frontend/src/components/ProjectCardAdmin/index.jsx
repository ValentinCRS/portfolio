import { useNavigate } from 'react-router-dom';
import './index.css';

const ProjectCard = ({ project, onDelete }) => {
    const navigate = useNavigate();
    return (
        <div className="project-card">
        <img src={project.image_url || 'https://via.placeholder.com/300'} alt={project.title} />
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="tech-tags">
            {project.skills && project.skills.map((skill) => (
                    <span key={skill._id} className="tag">
                        {skill.name} 
                    </span>
            ))}
        </div>
        <button className="message-delete" onClick={onDelete}>
                Supprimer
            </button>
            <button onClick={() => navigate("/admin/update-project/" + project._id)}>Editer le projet</button>
        <div className="links">
            {project.link_live && <a href={project.link_live} target="_blank" rel="noreferrer">Demo</a>}
        </div>
        </div>
    );
};

export default ProjectCard;