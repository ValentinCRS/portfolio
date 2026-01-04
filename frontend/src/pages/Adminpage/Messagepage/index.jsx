import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import MessageCard from "../../../components/MessageCard";
import './index.css';

const Messagepage = () => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }
        fetch('http://localhost:5000/api/messages', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => {
            if (res.status === 401) {
                alert("Session expirée, veuillez vous reconnecter.");
                navigate('/login');
                throw new Error("Non autorisé");
            }
            return res.json();
        })
            .then(data => setMessages(data))
            .catch(err => console.error(err));
    }, [navigate]);

    const handleDelete = async (id) => {
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`http://localhost:5000/api/messages/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                setMessages(currentMessages => currentMessages.filter(msg => msg._id !== id));
            } else {
                alert("Erreur lors de la suppression");
            }
        } catch (error) {
            console.error("Erreur delete:", error);
        }
    };

    return (
        <div className="message-page">
            <button onClick={() => navigate("/admin")}>
                Retour
            </button>
            <h2>Page des messages</h2>

            <div className="messages-grid">
                {messages.length > 0 ? (
                    messages.map((message) => (
                        <MessageCard
                            key={message._id}
                            message={message}
                            onDelete={() => handleDelete(message._id)}
                        />
                    ))
                ) : (
                    <p>Aucun message pour le moment.</p>
                )}
            </div>
        </div>
    );

}
export default Messagepage;