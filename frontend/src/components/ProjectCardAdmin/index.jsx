import { useNavigate } from 'react-router-dom';
import './index.css';

const ProjectCard = ({ project, onDelete }) => {
    const navigate = useNavigate();
    return (
        <div className="cyber-project-card">
            <div className="cyber-project-image-container">
                <img 
                    src={project.image_url || 'https://via.placeholder.com/300'} 
                    alt={project.title} 
                    className="cyber-project-image"
                />
                <div className="cyber-image-overlay"></div>
            </div>
            
            <div className="cyber-project-content">
                <h3 className="cyber-project-title">
                    <span className="sys-prompt">&gt;</span> {project.title}
                </h3>
                <p className="cyber-project-desc">{project.description}</p>
                
                <div className="cyber-project-tags">
                    {project.skills && project.skills.map((skill) => (
                        <span key={skill._id} className="cyber-tag">
                            {skill.name} 
                        </span>
                    ))}
                </div>
                
                <div className="cyber-project-actions">
                    {project.link_live && (
                        <a href={project.link_live} target="_blank" rel="noreferrer" className="cyber-action-link">
                            [ DEMO ]
                        </a>
                    )}
                    <button className="cyber-action-btn" onClick={() => navigate("/admin/update-project/" + project._id)}>
                        EDITER
                    </button>
                    <button className="cyber-delete-btn" onClick={onDelete}>
                        SUPPRIMER
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;