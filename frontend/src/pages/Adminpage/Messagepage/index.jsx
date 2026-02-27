import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import MessageCard from "../../../components/MessageCard";
import Nav from "../../../components/AdminNav"
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
        <div className="cyber-messages-page">
            <div className="cyber-messages-header">
                <Nav/>
                <h2 className="cyber-page-title">
                    <span className="sys-prompt">root@comms:</span> MESSAGE
                </h2>
            </div>

            <div className="cyber-messages-grid">
                {messages.length > 0 ? (
                    messages.map((message) => (
                        <MessageCard
                            key={message._id}
                            message={message}
                            onDelete={() => handleDelete(message._id)}
                        />
                    ))
                ) : (
                    <div className="cyber-empty-state">
                        <span className="sys-prompt">&gt;</span> SYSTEME : AUCUN_MESSAGE_INTERCEPTE.
                    </div>
                )}
            </div>
        </div>
    );

}
export default Messagepage;