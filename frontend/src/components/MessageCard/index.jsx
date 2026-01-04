import './index.css';

const MessageCard = ({ message, onDelete }) => {
    const formatDate = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('fr-FR', {
            day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
        });
    };

    return (
        <div className="message-card">
            <div className="message-header">
                <h3>Nom : {message.name}</h3>
                <span className="message-date">
                    Envoyé le : {formatDate(message.createdAt)}
                </span>
            </div>

            <h4 className="message-email">Email : {message.email}</h4>
            <p className="message-subject">Objet : {message.subject}</p>
            <p className="message-content">{message.content}</p>

            <button className="message-delete" onClick={onDelete}>
                Supprimer
            </button>
        </div>
    );
};

export default MessageCard;