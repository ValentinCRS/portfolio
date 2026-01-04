import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Form from '../../../../components/organisms/Form'
import FormGroup from '../../../../components/molecules/FormGroup';
import FormLabel from '../../../../components/atoms/FormLabel';
import Input from '../../../../components/atoms/FormInput';
import FormSubmit from '../../../../components/atoms/FormSubmit';


const UpdateProject = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image_url: '',
        link_live: ''
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
        <div className="update-project p-4">
            <h1 className="text-2xl font-bold mb-4">Mettre à jour le projet</h1>
            
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <FormLabel htmlFor="title">Titre du projet</FormLabel>
                    <Input 
                        type="text" 
                        id="title" 
                        name="title" 
                        placeholder="Titre du projet" 
                        value={formData.title} 
                        onChange={handleChange}
                        required
                    />
                </FormGroup>

                <FormGroup>
                    <FormLabel htmlFor="description">Description</FormLabel>
                    <Input
                        type="text"
                        id="description"
                        name="description"
                        placeholder="Description du projet"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>

                <FormGroup>
                    <FormLabel htmlFor="image_url">URL de l'image</FormLabel>
                    <Input
                        type="url"
                        id="image_url"
                        name="image_url"
                        placeholder="https://exemple.com/image.jpg"
                        value={formData.image_url}
                        onChange={handleChange}
                    />
                </FormGroup>

                <FormGroup>
                    <FormLabel htmlFor="link">Lien vers le projet</FormLabel>
                    <Input
                        type="url"
                        id="link"
                        name="link"
                        placeholder="https://exemple.com/projet"
                        value={formData.link}
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormSubmit content="Mettre à jour" /> 
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

export default UpdateProject;