import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Form from '../../../../components/organisms/Form'
import FormGroup from '../../../../components/molecules/FormGroup';
import FormLabel from '../../../../components/atoms/FormLabel';
import Input from '../../../../components/atoms/FormInput';
import FormSubmit from '../../../../components/atoms/FormSubmit';
import Nav from '../../../../components/AdminNav';
import './index.css';


const UpdateProject = () => {
    const navigate = useNavigate();
    const [availableSkills, setAvailableSkills] = useState([]);
    const { id } = useParams();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image_url: '',
        link_live: '',
        skills: []
    });

    useEffect(() => {
        fetch(`http://localhost:5000/api/projects/${id}`)
            .then(res => {
                if (!res.ok) throw new Error("Erreur chargement projet");
                return res.json();
            })
            .then(data => {
                setFormData({
                    title: data.title || '',
                    description: data.description || '',
                    image_url: data.image_url || '',
                    link: data.link || '' 
                });
            })
            .catch(err => console.error(err));

            fetch(`http://localhost:5000/api/skills`) 
            .then(res => {
                if (!res.ok) throw new Error("Erreur chargement compétences");
                return res.json();
            })
            .then(data => {
                setAvailableSkills(data); // On remplit le tableau, le chargement va disparaître !
            })
            .catch(err => console.error(err));

    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSkillChange = (e) => {
        const skillId = e.target.value;
        const isChecked = e.target.checked;

        setFormData((prevData) => {
            const currentSkills = prevData.skills || [];

            if (isChecked) {
                return { 
                    ...prevData, 
                    skills: [...currentSkills, skillId] 
                };
            } else {
                return { 
                    ...prevData, 
                    skills: currentSkills.filter((id) => id !== skillId) 
                };
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
            const response = await fetch(`http://localhost:5000/api/projects/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert("Projet mis à jour avec succès !");
                navigate("/admin");
            } else {
                alert("Erreur lors de la mise à jour");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="cyber-update-project-wrapper">
            <div className="cyber-update-project-container">
                <Nav/>
                <h1 className="cyber-page-title">
                    <span className="sys-prompt">root@project:</span> UPDATE_PROJECT
                </h1>
                
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <FormLabel>Titre_du_projet</FormLabel>
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
                        <FormLabel>Description</FormLabel>
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
                        <FormLabel>Image_URL</FormLabel>
                        <Input
                            type="url"
                            id="image_url"
                            name="image_url"
                            value={formData.image_url}
                            onChange={handleChange}
                        />
                    </FormGroup>

                    <FormGroup>
                        <FormLabel>Lien</FormLabel>
                        <Input
                            type="url"
                            id="link"
                            name="link"
                            value={formData.link}
                            onChange={handleChange}
                        />
                    </FormGroup>

                    <FormGroup>
                        <FormLabel>COMPÉTENCES_REQUISES</FormLabel>
                        <div className="cyber-skills-selector">
                            {availableSkills?.length > 0 ? (
                                availableSkills.map((skill) => (
                                    <label key={skill._id} className={`cyber-skill-tag ${formData.skills?.includes(skill._id) ? 'selected' : ''}`}>
                                        <input
                                            type="checkbox"
                                            value={skill._id}
                                            checked={formData.skills?.includes(skill._id) || false}
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
                    
                    <div className="cyber-form-actions">
                        <FormSubmit content="APPLIQUER_LES_MODIFICATIONS" /> 
                        <button 
                            type="button"
                            className="cyber-cancel-btn"
                            onClick={() => navigate('/admin')}
                        >
                            [X] RETOUR
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default UpdateProject;