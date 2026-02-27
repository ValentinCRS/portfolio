import React from "react";
import { Link } from "react-router-dom";
import './index.css';

const NotFound = () => {
    return (
        <div className="cyber-notfound-container">
            <div className="cyber-notfound-box">
                <h1 className="cyber-error-code">
                    <span className="sys-prompt">_&gt;</span> ERROR 404
                </h1>
                <p className="cyber-error-msg">
                    [CRITICAL] LA PAGE DEMANDEE EST INTROUVABLE DANS LE SYSTEME.
                </p>
                <Link to="/" className="cyber-back-btn">
                    RETOURNE_A_LA_PAGE_DACCUEIL
                </Link>
            </div>
        </div>
    );
}

export default NotFound;