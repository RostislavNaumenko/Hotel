import { Box, Typography, useTheme } from "@mui/material";
import React from "react";


const Header = ({ title, subtitle }) => {
    const theme = useTheme();
    return (
        <Box>
            <Typography
                variant="h2"
                color={theme.palette.secondary[100]}
                fontWeight="bold"
                sx={{
                    mb: "3px"
                }}
            >
                {title}
            </Typography>
            <Typography
                variant="h5"
                color={theme.palette.secondary[300]}
                sx={{
                    mb: "1.5rem"
                }}
            >
                {subtitle}
            </Typography>
        </Box>
    );
}

export default Header;
