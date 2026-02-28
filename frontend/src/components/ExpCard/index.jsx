import './index.css';

const ExpCard = ({ title, description, company, start_date, end_date }) => {
    return (
        <div className="cyber-exp-card">
            <div className="cyber-exp-header">
                <h2 className="cyber-exp-title">
                    <span className="sys-prompt">Titre:</span> {title}
                </h2>
                <span className="cyber-exp-dates">[{start_date} // {end_date}]</span>
            </div>
            
            <h3 className="cyber-exp-company">&gt; {company}</h3>
            
            <div className="cyber-exp-divider"></div>
            
            <p className="cyber-exp-desc">{description}</p>
        </div>
    );
}

export default ExpCard;