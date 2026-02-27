import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false); // Pour afficher un message de succès
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        try {
            // Changement de l'URL vers /signup
            const response = await fetch('http://localhost:5000/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();

            if (!response.ok) {
                setError(data.message || 'Erreur lors de la création du compte');
            } else {
                setSuccess(true);
                // On attend 2 secondes pour que l'utilisateur voit le message, puis redirection
                setTimeout(() => {
                    navigate('/login'); 
                }, 2000);
            }
        } catch (err) {
            setError('Erreur réseau');
        }
    };

    return (
        <div className="cyber-login-container">
            <div className="cyber-login-box">
                <h2><span className="sys-prompt">_&gt;</span> CREATE_ACCOUNT</h2>
                
                {error && <p className="cyber-error">[ERROR] {error}</p>}
                {success && <p className="cyber-success" style={{color: '#00ff00'}}>[SUCCESS] COMPTE_INITIALISÉ</p>}
                
                <form onSubmit={handleSubmit} className="cyber-form">
                    <input
                        type="email"
                        placeholder="NOUVEL_IDENTIFIANT (EMAIL)"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="cyber-input"
                    />
                    <input
                        type="password"
                        placeholder="NOUVEAU_MOT_DE_PASSE"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="cyber-input"
                    />
                    <button type="submit" className="cyber-button">
                        ENREGISTRER_DONNÉES
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Signup;