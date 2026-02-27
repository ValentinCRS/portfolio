import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../../../../components/organisms/Form';
import FormGroup from '../../../../components/molecules/FormGroup';
import FormLabel from '../../../../components/atoms/FormLabel';
import Input from '../../../../components/atoms/FormInput';
import FormSubmit from '../../../../components/atoms/FormSubmit';
import Nav from '../../../../components/AdminNav';
import './index.css'

const UpdatePresentation = () => {
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
    useEffect(() => {
        fetch('http://localhost:5000/api/presentation')
            .then(res => {
                if (!res.ok) throw new Error("Erreur chargement de la présentation");
                return res.json();
            })
            .then(data => {
                setFormData({
                    name: data.name || '',
                    description: data.description || '',
                    email: data.email || '',
                    telephone: data.telephone || '',
                    linkedin: data.linkedin || '',
                    github: data.github || '',
                    cv_url: data.cv_url || ''
                });
            })
            .catch(err => console.error(err));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        if (!token) {
            alert("Erreur : Vous n'êtes pas connecté !");
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/presentation', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert("Présentation mise à jour avec succès !");
                navigate("/admin");
            } else {
                alert("Erreur lors de la mise à jour");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="cyber-update-profile-wrapper">
            <div className="cyber-update-profile-container">
                <Nav/>
                <h1 className="cyber-page-title">
                    <span className="sys-prompt">root@presentation: </span> EDIT_PROFILE
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
                            type="text" 
                            id="description" 
                            name="description" 
                            value={formData.description} 
                            onChange={handleChange} 
                            required={true}
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
                            type="text" 
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
                        <FormSubmit content="APPLIQUER_LES_MODIFICATIONS" />
                        <button 
                            type="button"
                            className="cyber-cancel-btn"
                            onClick={() => navigate("/admin")}
                        >
                            [X] RETOUR
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default UpdatePresentation;