import { useNavigate } from 'react-router-dom';
import './index.css';

const ExpCardAdmin = ({ experience, onDelete }) => {
    const navigate = useNavigate();
    const { title, description, company, start_date, end_date, _id } = experience;
    
    return (
        <div className="cyber-admin-exp-card">
            <div className="cyber-admin-exp-header">
                <h2 className="cyber-admin-exp-title">
                    <span className="sys-prompt">Titre:</span> {title}
                </h2>
                <span className="cyber-admin-exp-dates">[{start_date} // {end_date}]</span>
            </div>
            
            <h3 className="cyber-admin-exp-company">&gt; {company}</h3>
            
            <div className="cyber-admin-exp-divider"></div>
            
            <p className="cyber-admin-exp-desc">{description}</p>
            
            <div className="cyber-admin-exp-actions">
                <button 
                    className="cyber-btn-edit" 
                    onClick={() => navigate(`/admin/update-experience/${_id}`)}
                >
                    [ EDITER ]
                </button>
                <button 
                    className="cyber-btn-delete" 
                    onClick={() => onDelete(_id)}
                >
                    [ SUPPRIMER ]
                </button>
            </div>
        </div>
    );
}

export default ExpCardAdmin;