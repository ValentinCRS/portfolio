import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../../../../components/organisms/Form'
import FormGroup from '../../../../components/molecules/FormGroup';
import FormLabel from '../../../../components/atoms/FormLabel';
import Input from '../../../../components/atoms/FormInput';
import FormSubmit from '../../../../components/atoms/FormSubmit';
import Nav from '../../../../components/AdminNav';
import './index.css'

const CreatePresentation = () => {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        email: '',
        telephone: '',
        linkedin: '',
        github: '',
        cv_url: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    
    console.log("Token envoyé :", token); 

    if (!token) {
        alert("Erreur : Vous n'êtes pas connecté !");
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/api/presentation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(formData)
        });
            if (response.ok) {
                alert("Présentation enregistrée !");
                navigate("/admin");
            } else {
                alert("Erreur lors de l'enregistrement");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="cyber-profile-wrapper">
            <div className="cyber-profile-container">
                <Nav/>
                <h1 className="cyber-page-title">
                    <span className="sys-prompt">root@presentation:</span> PROFILE
                </h1>
                
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <FormLabel>Nom</FormLabel>
                        <Input
                            type="text" 
                            id="name" 
                            name="name" 
                            value={formData.name} 
                            onChange={handleChange} 
                            required={true}
                        />
                    </FormGroup>

                    <FormGroup>
                        <FormLabel>Description</FormLabel>
                        <Input 
                            label="Directive_Principale (Description)"
                            type="text" 
                            id="description" 
                            name="description" 
                            value={formData.description} 
                            onChange={handleChange} 
                            placeholder="Brève description..." 
                        />
                    </FormGroup>

                    <FormGroup>
                        <FormLabel>Email</FormLabel>
                        <Input
                            type="email" 
                            id="email" 
                            name="email" 
                            value={formData.email} 
                            onChange={handleChange} 
                        />
                    </FormGroup>

                    <FormGroup>
                        <FormLabel>Téléphone</FormLabel>
                        <Input
                            type="tel" 
                            id="telephone" 
                            name="telephone" 
                            value={formData.telephone} 
                            onChange={handleChange} 
                        />
                    </FormGroup>

                    <FormGroup>
                        <FormLabel>LinkedIn</FormLabel>
                        <Input
                            type="url" 
                            id="linkedin" 
                            name="linkedin" 
                            value={formData.linkedin} 
                            onChange={handleChange} 
                        />
                    </FormGroup>

                    <FormGroup>
                        <FormLabel>GitHub</FormLabel>
                        <Input
                            type="url" 
                            id="github" 
                            name="github" 
                            value={formData.github} 
                            onChange={handleChange} 
                        />
                    </FormGroup>
                    <div className="cyber-form-actions">
                        <FormSubmit content="SAUVEGARDER_LE_PROFIL" />
                        <button type="button" className="cyber-cancel-btn" onClick={() => navigate("/admin")} >
                            [X] RETOUR
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default CreatePresentation;