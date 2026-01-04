import './index.css';

const ProjectCard = ({ project}) => {
    return (
        <div className="project-card">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="tech-tags">
            {project.skills && project.skills.map((skill) => (
                    <span key={skill._id} className="tag">
                        {skill.name} 
                    </span>
            ))}
        </div>
        <div className="links">
            <a href={project.link} target="_blank" rel="noreferrer">Lien vers le github</a>
        </div>
        </div>
    );
};

export default ProjectCard;