import React from 'react';
import { Box, useTheme } from "@mui/material";
import { useGetWorkersQuery } from 'state/api';
import Header from 'components/Header';
import { DataGrid } from '@mui/x-data-grid';

const Workers = () => {
    const theme = useTheme();
    const { data, isLoading } = useGetWorkersQuery();
    console.log("data", data);

    const columns = [
        // {
        //     field: "_id",
        //     headerName: "ID",
        //     flex: 1,
        // },
        {
            field: "name",
            headerName: "Ім'я",
            flex: 1,
        },
        {
            field: "surname",
            headerName: "Прізвище",
            flex: 1,
        },
        {
            field: "email",
            headerName: "Email",
            flex: 1,
        },
        {
            field: "phoneNumber",
            headerName: "Телефон",
            flex: 1,
            renderCell: (params) => {
                return params.value.replace(/^\+38\d{10}$/)
            }
        },
        {
            field: "occupation",
            headerName: "Посада",
            flex: 1,
        }
    ]

    return (
        <Box m="1.5rem 2.5rem" >
            <Box > 
                <Header title="Workers" subtitle="List of workers in RostyGmbh" />
                <Box
                    mt="40px"
                    height="75vh"
                    textTransform="none"
                    transform="none"
                    
                    sx={{
                        "& .MuiDataGrid-root": {
                            border: "none",
                        },
                        "& .MuiDataGrid-cell": {
                            borderBottom: "none",
                        },
                        "& .MuiDataGrid-columnHeaders": {
                            backgroundColor: theme.palette.background.alt,
                            color: theme.palette.secondary[200],
                            borderBottom: "none",
                        },
                        "& .MuiDataGrid-virtualScroller": {
                            backgroundColor: theme.palette.primary.light,
                        },
                        "& .MuiDataGrid-footerContainer": {
                            backgroundColor: theme.palette.background.alt,
                            color: theme.palette.secondary[100],
                            borderTop: "none",
                        },
                        "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                            color: `${theme.palette.secondary[200]} !important`,
                        },
                    }}
                >
                    <DataGrid
                        loading={isLoading || !data}
                        getRowId={(row) => row._id}
                        rows={data || []}
                        columns={columns}
                    />
                </Box>
            </Box>
        </Box>
    );
}

export default Workers;
