import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../../../../components/organisms/Form'
import FormGroup from '../../../../components/molecules/FormGroup';
import FormLabel from '../../../../components/atoms/FormLabel';
import Input from '../../../../components/atoms/FormInput';
import FormSubmit from '../../../../components/atoms/FormSubmit';
import Nav from '../../../../components/AdminNav';
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
        <div className="cyber-create-skill-wrapper">
            <div className="cyber-create-skill-container">
                <Nav/>
                <h1 className="cyber-page-title">
                    <span className="sys-prompt">root@skills:</span> CREER_UN_SKILL
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
                            required
                        />
                    </FormGroup>

                    <FormGroup>
                        <FormLabel>Catégorie</FormLabel>
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

                    <div className="cyber-form-actions">
                        <FormSubmit content="INITIALISER_LE_MODULE" />
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

export default CreatePresentation;