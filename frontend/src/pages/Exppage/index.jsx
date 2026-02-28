import { useState, useEffect } from 'react';
import ExpCard from '../../components/ExpCard';
import './index.css'

const Exppage = () => {

    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5000/api/experiences') 
            .then(response => {
                if (!response.ok) throw new Error("Erreur réseau");
                return response.json();
            })
            .then(data => {
                setExperiences(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Erreur :', error);
                setLoading(false);
            });
    }, []);
    
    return (
        <div className="cyber-explist-wrapper">
            <h1 className="cyber-section-title">
                <span className="sys-prompt">_&gt;</span> MES EXPERIENCES
            </h1>
            
            <div className="cyber-explist-container">
                {loading ? (
                    <p className="cyber-status-text pulsing">LOADING_MODULES...</p>
                ) : experiences.length > 0 ? (
                    experiences.map(exp => <ExpCard key={exp._id} {...exp} />) 
                    /* Ou experience={exp} selon comment tu as défini tes props dans ExpCard */
                ) : (
                    <p className="cyber-status-text error">NO_EXPERIENCES_FOUND</p>
                )}
            </div>
        </div>
    );
}

export default Exppage;