import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../../../../components/organisms/Form'
import FormGroup from '../../../../components/molecules/FormGroup';
import FormLabel from '../../../../components/atoms/FormLabel';
import Input from '../../../../components/atoms/FormInput';
import FormSubmit from '../../../../components/atoms/FormSubmit';

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
    const token = localStorage.getItem('token'); // 👈 Récupération du token

    // 👇 AJOUTE CETTE LIGNE POUR VÉRIFIER
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
        <div className="create-presentation p-4">
            <h1 className="text-2xl font-bold mb-4">Créer mon Profil</h1>
            
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <FormLabel htmlFor="name">Nom</FormLabel>
                    <Input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        placeholder="" 
                        required={true}
                    />
                </FormGroup>

                <FormGroup>
                    <FormLabel htmlFor="description">Description</FormLabel>
                    <Input 
                        type="text" 
                        id="description" 
                        name="description" 
                        value={formData.description} 
                        onChange={handleChange} 
                        placeholder="Brève description de moi-même" 
                    />
                </FormGroup>

                <FormGroup>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        placeholder="" 
                    />
                </FormGroup>

                <FormGroup>
                    <FormLabel htmlFor="telephone">Téléphone</FormLabel>
                    <Input 
                        type="tel" 
                        id="telephone" 
                        name="telephone" 
                        value={formData.telephone} 
                        onChange={handleChange} 
                        placeholder=""
                    />
                </FormGroup>

                <FormGroup>
                    <FormLabel htmlFor="linkedin">LinkedIn</FormLabel>
                    <Input 
                        type="url" 
                        id="linkedin" 
                        name="linkedin" 
                        value={formData.linkedin} 
                        onChange={handleChange} 
                        placeholder="" 
                    />
                </FormGroup>

                <FormGroup>
                    <FormLabel htmlFor="github">GitHub</FormLabel>
                    <Input 
                        type="url" 
                        id="github" 
                        name="github" 
                        value={formData.github} 
                        onChange={handleChange} 
                        placeholder="" 
                    />
                </FormGroup>

                <FormGroup>
                    <FormLabel htmlFor="cv_url">CV (PDF)</FormLabel>
                    <Input 
                        type="url" 
                        id="cv_url" 
                        name="cv_url" 
                        value={formData.cv_url} 
                        onChange={handleChange} 
                        placeholder="" 
                    />
                </FormGroup>

                <div className="mt-4">
                    <FormSubmit content="Enregistrer le profil" />
                </div>
            </Form>

            <button 
                className="mt-4 text-gray-500 hover:text-black"
                onClick={() => navigate("/admin")}
            >
                Annuler et Retour
            </button>
        </div>
    );
}

export default CreatePresentation;