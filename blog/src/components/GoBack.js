import React from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const GoBack = () => {

    const navigate = useNavigate()
    return (
        <div className=' text-primary d-md-none' style={{position: "absolute", left: "1rem", top: "4rem"}}>
            <ArrowBackIcon fontSize='small' onClick={() => navigate(-1)}></ArrowBackIcon>
        </div>
    );
};

export default GoBack;