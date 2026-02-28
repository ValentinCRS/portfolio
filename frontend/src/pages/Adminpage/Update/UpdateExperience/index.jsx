import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Form from '../../../../components/organisms/Form'
import FormGroup from '../../../../components/molecules/FormGroup';
import FormLabel from '../../../../components/atoms/FormLabel';
import Input from '../../../../components/atoms/FormInput';
import FormSubmit from '../../../../components/atoms/FormSubmit';
import Nav from '../../../../components/AdminNav';
import './index.css';


const UpdateExperience = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        company: '',
        start_date: '',
        end_date: '',
    });

    useEffect(() => {
        fetch(`http://localhost:5000/api/experiences/${id}`)
            .then(res => {
                if (!res.ok) throw new Error("Erreur chargement expérience");
                return res.json();
            })
            .then(data => {
                setFormData({
                    title: data.title || '',
                    description: data.description || '',
                    company: data.company || '',
                    start_date: data.start_date || '',
                    end_date: data.end_date || ''
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
            const response = await fetch(`http://localhost:5000/api/experiences/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert("Expérience mise à jour avec succès !");
                navigate("/admin");
            } else {
                alert("Erreur lors de la mise à jour");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="cyber-create-page-wrapper">
            <Nav />
            <div className="cyber-create-project-container">
                <h1 className="cyber-page-title">
                    <span className="sys-prompt">root@experience:</span> MODIFIER_UNE_EXPERIENCE
                </h1>

                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <FormLabel>TITRE</FormLabel>
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
                        <FormLabel>DESCRIPTION</FormLabel>
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
                        <FormLabel>COMPANY</FormLabel>
                        <Input
                            type="text"
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                        />
                    </FormGroup>

                    <FormGroup>
                        <FormLabel>DATE_DEBUT</FormLabel>
                        <Input
                            type="text"
                            id="start_date"
                            name="start_date"
                            value={formData.start_date}
                            onChange={handleChange}
                        />
                    </FormGroup>

                    <FormGroup>
                        <FormLabel>DATE_FIN</FormLabel>
                        <Input
                            type="text"
                            id="end_date"
                            name="end_date"
                            value={formData.end_date}
                            onChange={handleChange}
                        />
                    </FormGroup>
                    
                    <FormSubmit content="INITIALISER_L'EXPERIENCE" />
                    <button type="button" className="cyber-cancel-btn" onClick={() => navigate("/admin")}>
                        [X] RETOUR
                    </button>
                </Form>
                
            </div>
        </div>
    );
}

export default UpdateExperience ;