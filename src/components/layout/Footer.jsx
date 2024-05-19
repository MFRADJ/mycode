import React from 'react';
import { Box, Typography } from '@mui/material';

function Footer() {
    return (
        <Box component="footer" sx={{ py: 3, textAlign: 'center', bgcolor: 'background.paper', mt: 'auto' }}>
            <Typography variant="body1">
                &copy; {new Date().getFullYear()} Acme Courses. All rights reserved.
            </Typography>
        </Box>
    );
}

export default Footer;
