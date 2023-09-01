import React from 'react';
import { Typography } from '@mui/material';
import DeblurIcon from '@mui/icons-material/Deblur';

const Title = () => {
    return (
        <Typography
            variant="h3"
            noWrap
            component="a"
            href="/"
            sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.6rem',
                color: '#1F618D',
                textDecoration: 'none',
            }}
        >
            <div className='d-flex align-items-center'>
                <DeblurIcon fontSize='large' sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> BLOG
            </div>
        </Typography>
    );
};

export default Title;