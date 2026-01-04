import './index.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../../components/organisms/Form';
import FormGroup from '../../components/molecules/FormGroup';
import FormLabel from '../../components/atoms/FormLabel';
import Input from '../../components/atoms/FormInput';
import FormSubmit from '../../components/atoms/FormSubmit';

const Contactpage = () => {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        content: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('http://localhost:5000/api/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
            if (response.ok) {
                alert("Message envoyé !");
                navigate("/");
            } else {
                alert("Erreur lors de l'envoie du message");
            }
        } catch (error) {
            console.error(error);
        }
    };

  return (
    <div className="contact-page">
        <h1>Contactez-moi</h1>
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <FormLabel htmlFor="name">Nom:</FormLabel>
                <Input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Votre nom" required={true} />
            </FormGroup>
            <FormGroup>
                <FormLabel htmlFor="email">Email:</FormLabel>
                <Input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Votre email" required={true} />
            </FormGroup>
            <FormGroup>
                <FormLabel htmlFor="subject">Sujet:</FormLabel>
                <Input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} placeholder="Sujet du message" required={true} />
            </FormGroup>
            <FormGroup>
                <FormLabel htmlFor="content">Message:</FormLabel>
                <textarea type="textarea" id="content" name="content" value={formData.content} onChange={handleChange} placeholder="Votre message" required={true}>
                </textarea>
            </FormGroup>
            <FormSubmit content="Envoyer">Envoyer</FormSubmit>
        </Form>
    </div>
  );
}
export default Contactpage;