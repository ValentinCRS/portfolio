import './index.css';

const ProjectCard = ({ project}) => {
    return (
        <div className="cyber-public-card">
            <h3 className="cyber-public-title">
                <span className="sys-prompt">&gt;</span> {project.title}
            </h3>
            
            <div className="cyber-public-image-container">
                {project.image_url ? (
                    <>
                        <img 
                            src={project.image_url} 
                            alt={project.title} 
                            className="cyber-public-image"
                        />
                        <div className="cyber-image-scanline"></div>
                    </>
                ) : (
                    <div className="cyber-placeholder-image">
                        [ IMAGE_NON_TROUVÉE ]
                    </div>
                )}
            </div>
            
            <p className="cyber-public-desc">{project.description}</p>
            
            <div className="cyber-public-tags">
                {project.skills && project.skills.map((skill) => (
                    <span key={skill._id} className="cyber-tag">
                        {skill.name} 
                    </span>
                ))}
            </div>
            
            {project.link && (
                <div className="cyber-public-links">
                    <a href={project.link} target="_blank" rel="noreferrer" className="cyber-github-link">
                        [ Lien_Github ]
                    </a>
                </div>
            )}
        </div>
    );
};

export default ProjectCard;