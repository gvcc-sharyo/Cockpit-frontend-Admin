import { Button, CircularProgress } from "@mui/material";

const CustomButton = ({
    children,
    onClick,
    loading = false,
    bgColor = '#1976D2',
    borderRadius = '8px',
    sx = {}, // accept custom sx
    ...props
}) => {
    return (
        <Button
            variant="contained"
            onClick={onClick}
            onSubmit={onClick}
            disabled={loading}
            fullWidth
            type="submit"
            sx={{
                backgroundColor: bgColor,
                borderRadius: borderRadius,
                color: '#fff',
                fontWeight: 600,
                textTransform: 'none',
               
                '&:hover': {
                    backgroundColor: bgColor,
                },
                ...sx,
            }}
            {...props}
        >
            {loading ? <CircularProgress size={20} color="inherit" /> : children}
        </Button>
    );
};
export default CustomButton;