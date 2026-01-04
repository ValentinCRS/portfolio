import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../../../../components/organisms/Form'
import FormGroup from '../../../../components/molecules/FormGroup';
import FormLabel from '../../../../components/atoms/FormLabel';
import Input from '../../../../components/atoms/FormInput';
import FormSubmit from '../../../../components/atoms/FormSubmit';
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
        <div className="create-project">
            <h1>Créer un Projet</h1>

            <Form onSubmit={handleSubmit}>
                <FormGroup className="form-group">
                    <FormLabel htmlFor="name">Nom</FormLabel>
                    <Input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>

                <FormGroup className="form-group">
                    <FormLabel htmlFor="description">Description</FormLabel>
                    <Input
                        type="text"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>

                <FormGroup className="form-group">
                    <FormLabel htmlFor="image_url">URL de l'image</FormLabel>
                    <Input
                        type="text"
                        id="image_url"
                        name="image_url"
                        value={formData.image_url}
                        onChange={handleChange}
                    />
                </FormGroup>

                <FormGroup className="form-group">
                    <FormLabel htmlFor="link">Lien du projet</FormLabel>
                    <Input
                        type="text"
                        id="link"
                        name="link"
                        value={formData.link}
                        onChange={handleChange}
                    />
                </FormGroup>

                <FormGroup className="form-group">
                    <FormLabel>Compétences utilisées</FormLabel>
                    
                    <div className="skills-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
                        {availableSkills.length > 0 ? (
                            availableSkills.map((skill) => (
                                <label key={skill._id} style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer', background: '#f0f0f0', padding: '5px 10px', borderRadius: '5px' }}>
                                    <input
                                        type="checkbox"
                                        value={skill._id}
                                        // On vérifie si l'ID est dans le tableau pour cocher la case
                                        checked={formData.skills.includes(skill._id)}
                                        onChange={handleSkillChange}
                                    />
                                    <span>{skill.name}</span> 
                                </label>
                            ))
                        ) : (
                            <p>Chargement des compétences...</p>
                        )}
                    </div>
                </FormGroup>

                <FormSubmit content="Enregistrer le projet" />
            </Form>

            <button
                className="cancel-button"
                onClick={() => navigate("/admin")}
            >
                Annuler et retour
            </button>
        </div>
    );
}

export default CreateProject;