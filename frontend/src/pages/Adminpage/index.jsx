import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Adminpage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

    return (
        <div className="adminpage">
            <h2>Page Admin HEHEHEHEHE</h2>
            <button onClick={handleLogout}>Se déconnecter</button>
        </div>
    );
}

export default Adminpage;