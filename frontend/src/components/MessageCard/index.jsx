import './index.css';

const MessageCard = ({ message, onDelete }) => {
    const formatDate = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('fr-FR', {
            day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
        });
    };

    return (
        <div className="cyber-message-card">
            <div className="cyber-message-header">
                <h3 className="cyber-sender">
                    <span className="sys-prompt">NOM:</span> {message.name}
                </h3>
                <span className="cyber-date">
                    [ {formatDate(message.createdAt)} ]
                </span>
            </div>

            <h4 className="cyber-email">
                <span className="sys-prompt">ENVOYER_PAR:</span> {message.email}
            </h4>
            <p className="cyber-subject">
                <span className="sys-prompt">OBJET:</span> {message.subject}
            </p>
            
            <div className="cyber-message-content">
                <p>{message.content}</p>
            </div>

            <button className="cyber-delete-btn" onClick={onDelete}>
                [X] PURGER_MESSAGE
            </button>
        </div>
    );
};

export default MessageCard;