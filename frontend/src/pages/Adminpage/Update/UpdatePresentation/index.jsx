import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../../../../components/organisms/Form';
import FormGroup from '../../../../components/molecules/FormGroup';
import FormLabel from '../../../../components/atoms/FormLabel';
import Input from '../../../../components/atoms/FormInput';
import FormSubmit from '../../../../components/atoms/FormSubmit';

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
        <div className="update-presentation p-4">
            <h1 className="text-2xl font-bold mb-4">Modifier ma Présentation</h1>
            
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <FormLabel htmlFor="name">Nom complet</FormLabel>
                    <Input 
                        type="text" id="name" name="name" 
                        value={formData.name} onChange={handleChange} 
                        required 
                    />
                </FormGroup>

                <FormGroup>
                    <FormLabel htmlFor="description">Description / Bio</FormLabel>
                    <Input 
                        type="text" id="description" name="description" 
                        value={formData.description} onChange={handleChange} 
                        required 
                    />
                </FormGroup>

                <FormGroup>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input 
                        type="email" id="email" name="email" 
                        value={formData.email} onChange={handleChange} 
                    />
                </FormGroup>

                <FormGroup>
                    <FormLabel htmlFor="telephone">Téléphone</FormLabel>
                    <Input 
                        type="text" id="telephone" name="telephone" 
                        value={formData.telephone} onChange={handleChange} 
                    />
                </FormGroup>

                <FormGroup>
                    <FormLabel htmlFor="linkedin">Lien LinkedIn</FormLabel>
                    <Input 
                        type="url" id="linkedin" name="linkedin" 
                        value={formData.linkedin} onChange={handleChange} 
                    />
                </FormGroup>

                <FormGroup>
                    <FormLabel htmlFor="github">Lien GitHub</FormLabel>
                    <Input 
                        type="url" id="github" name="github" 
                        value={formData.github} onChange={handleChange} 
                    />
                </FormGroup>

                <FormGroup>
                    <FormLabel htmlFor="cv_url">Lien vers le CV (PDF)</FormLabel>
                    <Input 
                        type="url" id="cv_url" name="cv_url" 
                        value={formData.cv_url} onChange={handleChange} 
                    />
                </FormGroup>

                <FormSubmit content="Sauvegarder les modifications" /> 
            </Form>

            <button 
                className="mt-4 text-sm text-gray-500 underline"
                onClick={() => navigate('/admin')}
            >
                Annuler
            </button>
        </div>
    );
}

export default UpdatePresentation;