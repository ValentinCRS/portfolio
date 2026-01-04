import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../../../../components/organisms/Form'
import FormGroup from '../../../../components/molecules/FormGroup';
import FormLabel from '../../../../components/atoms/FormLabel';
import Input from '../../../../components/atoms/FormInput';
import FormSubmit from '../../../../components/atoms/FormSubmit';
import './index.css';

const CreatePresentation = () => {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        name: '',
        category: '',
    });

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
        const response = await fetch('http://localhost:5000/api/skills', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(formData)
        });
            if (response.ok) {
                alert("Skill enregistrée !");
                navigate("/admin");
            } else {
                alert("Erreur lors de l'enregistrement");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="create-presentation">
            <h1>Créer un Skill</h1>

            <Form onSubmit={handleSubmit}>
                <FormGroup className="form-group">
                    <FormLabel htmlFor="name">Nom</FormLabel>
                    <Input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>

                <FormGroup className="form-group">
                    <FormLabel htmlFor="category">Catégorie</FormLabel>
                    <Input
                            type="text"
                            id="category"
                            name="category"
                            placeholder="Ex: Frontend, Backend, Outils..."
                            value={formData.category}
                            onChange={handleChange}
                            required
                        />
                </FormGroup>

                <FormSubmit content="Enregistrer le skill" />
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

export default CreatePresentation;