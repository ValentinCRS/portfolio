import './index.css';

const ProjectCard = ({ project }) => {
    return (
        <div className="project-card">
        <img src={project.image_url || 'https://via.placeholder.com/300'} alt={project.title} />
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="tech-tags">
            {project.technologies?.map((tech, index) => (
            <span key={index} className="tag">{tech}</span>
            ))}
        </div>
        <div className="links">
            <a href={project.link_github} target="_blank" rel="noreferrer">GitHub</a>
            {project.link_live && <a href={project.link_live} target="_blank" rel="noreferrer">Demo</a>}
        </div>
        </div>
    );
};

export default ProjectCard;