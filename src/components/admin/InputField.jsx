import { TextField, Typography, Grid } from "@mui/material";

const InputField = ({
    label,
    name,
    value,
    onChange,
    type = "text",
    select = false,
    children,
    size = "small",
    xs = 10,
    md = 6,
    sm = 5,
    ...rest
}) => {
    return (
        <Grid item size={{ xs: {xs}, md: {md}, sm: {sm} }}>
            {label && (
                
                <Typography sx={{ fontSize: '14px' }} gutterBottom>
                    {label}
                </Typography>
            )}
            <TextField
                fullWidth
                label={label}
                name={name}
                value={value}
                onChange={onChange}
                size={size}
                select={select}
                {...rest}
                slotProps={{
                    inputLabel: {
                        sx: {
                            fontSize: '14px'
                        }
                    }
                }}
            >
                {children}
            </TextField>
        </Grid>
    );
};

export default InputField;
