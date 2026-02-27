import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Form from '../../../../components/organisms/Form';
import FormGroup from '../../../../components/molecules/FormGroup';
import FormLabel from '../../../../components/atoms/FormLabel';
import Input from '../../../../components/atoms/FormInput';
import FormSubmit from '../../../../components/atoms/FormSubmit';
import Nav from '../../../../components/AdminNav';
import './index.css';

const UpdateSkills = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [formData, setFormData] = useState({
        name: '',
        category: ''
    });

    useEffect(() => {
        fetch(`http://localhost:5000/api/skills/${id}`)
            .then(res => {
                if (!res.ok) throw new Error("Erreur chargement skill");
                return res.json();
            })
            .then(data => {
                setFormData({
                    name: data.name || '',
                    category: data.category || ''
                });
            })
            .catch(err => console.error(err));
    }, [id]);

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
            const response = await fetch(`http://localhost:5000/api/skills/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert("Compétence mise à jour !");
                navigate("/admin");
            } else {
                alert("Erreur lors de la mise à jour");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async () => {

        const token = localStorage.getItem('token');
        if (!token) {
            alert("Erreur : Vous n'êtes pas connecté !");
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/api/skills/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                alert("Compétence supprimée avec succès !");
                navigate("/admin");
            } else {
                alert("Erreur lors de la suppression.");
            }
        } catch (error) {
            console.error("Erreur delete:", error);
            alert("Erreur serveur lors de la suppression.");
        }
    };

    return (
        <div className="cyber-update-skill-wrapper">
            <div className="cyber-update-skill-container">
                <Nav/>
                <h1 className="cyber-page-title">
                    <span className="sys-prompt">root@skills:</span> EDIT_SKILL
                </h1>

                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <FormLabel>Nom</FormLabel>
                        <Input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Ex: React, Node.js..."
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
                        <FormSubmit content="APPLIQUER_LES_MODIFICATIONS" />
                        
                        <button
                            type="button" 
                            className="cyber-delete-btn"
                            onClick={handleDelete}
                        >
                            [!] SUPPRIMER_LE_SKILL
                        </button>

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

export default UpdateSkills;