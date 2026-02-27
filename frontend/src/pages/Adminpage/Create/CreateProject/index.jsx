import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../../../../components/organisms/Form'
import FormGroup from '../../../../components/molecules/FormGroup';
import FormLabel from '../../../../components/atoms/FormLabel';
import Input from '../../../../components/atoms/FormInput';
import FormSubmit from '../../../../components/atoms/FormSubmit';
import Nav from '../../../../components/AdminNav';
import './index.css';

const CreateProject = () => {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        title : '',
        description : '',
        image_url : '',
        link : '',
        skills : []
    });

    const [availableSkills, setAvailableSkills] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/skills')
            .then(res => res.json())
            .then(data => setAvailableSkills(data))
            .catch(err => console.error("Erreur chargement skills", err));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSkillChange = (e) => {
        const skillId = e.target.value;
        const isChecked = e.target.checked;

        setFormData(prev => {
            if (isChecked) {
                return { ...prev, skills: [...prev.skills, skillId] };
            } else {
                return { ...prev, skills: prev.skills.filter(id => id !== skillId) };
            }
        });
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
        alert("Erreur : Vous n'êtes pas connecté !");
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/api/projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(formData)
        });
            if (response.ok) {
                alert("Projet enregistré !");
                navigate("/admin");
            } else {
                alert("Erreur lors de l'enregistrement");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="cyber-create-page-wrapper">
            <Nav />
            <div className="cyber-create-project-container">
                <h1 className="cyber-page-title">
                    <span className="sys-prompt">root@project:</span> CREER_UN_PROJET
                </h1>

                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <FormLabel>TITRE</FormLabel>
                        <Input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </FormGroup>

                    <FormGroup>
                        <FormLabel>DESCRIPTION</FormLabel>
                        <Input
                            type="text"
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </FormGroup>

                    <FormGroup>
                        <FormLabel>IMAGE_URL</FormLabel>
                        <Input
                            type="text"
                            id="image_url"
                            name="image_url"
                            value={formData.image_url}
                            onChange={handleChange}
                        />
                    </FormGroup>

                    <FormGroup>
                        <FormLabel>LIEN_GITHUB</FormLabel>
                        <Input
                            type="text"
                            id="link"
                            name="link"
                            value={formData.link}
                            onChange={handleChange}
                        />
                    </FormGroup>

                    <FormGroup>
                        <FormLabel>COMPÉTENCES_REQUISES</FormLabel>
                        <div className="cyber-skills-selector">
                            {availableSkills.length > 0 ? (
                                availableSkills.map((skill) => (
                                    <label key={skill._id} className={`cyber-skill-tag ${formData.skills.includes(skill._id) ? 'selected' : ''}`}>
                                        <input
                                            type="checkbox"
                                            value={skill._id}
                                            checked={formData.skills.includes(skill._id)}
                                            onChange={handleSkillChange}
                                            className="hidden-checkbox"
                                        />
                                        <span>{skill.name}</span>
                                    </label>
                                ))
                            ) : (
                                <p className="cyber-loading-text">CHARGEMENT_DES_MODULES...</p>
                            )}
                        </div>
                    </FormGroup>
                    
                    <FormSubmit content="INITIALISER_LE_PROJET" />
                    <button type="button" className="cyber-cancel-btn" onClick={() => navigate("/admin")}>
                        [X] RETOUR
                    </button>
                </Form>
                
            </div>
        </div>
    );
}

export default CreateProject;