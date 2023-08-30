import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from "react-router-dom";

const Error404 = () => {
    const navigate = useNavigate();

    return (
        <div style={{ minHeight: "90vh" }} className='d-flex flex-column justify-content-center align-items-center'>
            <h1 className='titulo404'>404</h1>
            <h4 className='subtitulo404 mb-4'>Página no disponible</h4>
            <Button variant="contained" onClick={() => navigate("/")}>Volver a inicio</Button>
        </div>
    );
};

export default Error404;