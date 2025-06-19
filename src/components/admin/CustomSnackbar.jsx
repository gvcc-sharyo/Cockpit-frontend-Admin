import { useState, useEffect } from 'react';
import { Snackbar, Alert } from '@mui/material';

let externalSnackbarCallback = null;

export const snackbarEmitter = (message, severity = 'info') => {
    if (externalSnackbarCallback) {
        externalSnackbarCallback(message, severity);
    } else {
        console.warn('Snackbar system not ready yet.');
    }
};

export const CustomSnackbarProvider = ({ children }) => {
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'info',
    });

    const showSnackbar = (message, severity = 'info') => {
        setSnackbar({
            open: true,
            message: typeof message === 'string' ? message : JSON.stringify(message),
            severity,
        });
    };

    const handleClose = () => setSnackbar((prev) => ({ ...prev, open: false }));

    useEffect(() => {
        externalSnackbarCallback = showSnackbar;
        return () => {
            externalSnackbarCallback = null;
        };
    }, []);

    return (
        <>
            {children}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert onClose={handleClose} severity={snackbar.severity} variant="filled">
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </>
    );
};