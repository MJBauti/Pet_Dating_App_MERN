import React from "react";
import { Link } from "react-router-dom";
import "./LogoLink.css";
import logoPng from "../../Assets/logo.png"

export const LogoLink = () => {
    return (
        <Link to="/">
            <img src={logoPng} alt="Logo" className="img"
            />
        </Link>
    );
};

export default LogoLink
