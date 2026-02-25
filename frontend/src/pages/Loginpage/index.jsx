import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

const Loginpage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();

            if (!response.ok) {
                setError(data.message || 'Erreur de connexion');
            } else {
                localStorage.setItem('token', data.token);
                navigate('/admin');
            }
        } catch (err) {
            setError('Erreur réseau');
        }
    };

    return (
        <div className="cyber-login-container">
            <div className="cyber-login-box">
                <h2><span className="sys-prompt">_&gt;</span> AUTH_REQUIRED</h2>
                
                {error && <p className="cyber-error">[ERROR] {error}</p>}
                
                <form onSubmit={handleSubmit} className="cyber-form">
                    <input
                        type="email"
                        placeholder="IDENTIFIANT (EMAIL)"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="cyber-input"
                    />
                    <input
                        type="password"
                        placeholder="MOT_DE_PASSE"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="cyber-input"
                    />
                    <button type="submit" className="cyber-button">
                        INITIALISER_CONNEXION
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Loginpage;