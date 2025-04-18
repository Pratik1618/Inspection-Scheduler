import React, { useEffect, useState } from 'react'
import { Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, styled, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DataGrid } from '@mui/x-data-grid';
import { StyledDatePicker, StyledInputLabel, StyledSelect, StyledTextField } from '../components/styledComponents';
import Box from '@mui/material/Box';
import axios from 'axios';


interface FormData{
    name:string,
    role:string,
    number:number|"",
    password:string,
    email:string
}

interface Role {
    value: string;
    label: string;
}
const columns = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'role', headerName: 'Role', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'number', headerName: 'Phone', flex: 1 },
    {
        field: 'Action', headerName: 'Action', width: 150,
        renderCell: (params) => {
            return (
                <div className="flex gap-2 mt-2" >
                    <Button variant="contained" color="primary" size="small">Edit</Button>
                    <Button variant="outlined" color="secondary" size="small">Delete</Button>
                </div>
            );
        }
    }
];
const roles:Role[] = [
    { value: 'admin', label: 'Admin' },
    { value: 'technician', label: 'Technician' },
    { value: 'store_manager', label: 'Store Manager' },
    { value: 'zonal_manager', label: 'Zonal Manager' },
];





const AddUser:React.FC = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [error, setError] = useState<string>('')
const [formData,setFormData]= useState<FormData>({
    name:'',
    role:'',
    email:'',
    number:"",
    password:''
})

const handleChange =(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>|  SelectChangeEvent<unknown>)=>{
const {name,value} = e.target;

setFormData((prevState)=>({
    ...prevState,
    [name as string]:name ===  'number' ? parseInt(value as string) || '' : value,
}));
}

useEffect(() => {
    fetchUsers();
}, []);

const fetchUsers = async () => {
    try {
        const response = await axios.get('http://localhost:5000/users');
        setUsers(response.data); // assuming API returns array of users
    } catch (error) {
        console.error('Failed to fetch users:', error);
    }
};

const handleSubmit= async ()=>{

    if(!formData.name || !formData.role || !formData.email || !formData.number || !formData.password) {
        alert("Please fill all the fields");
        return;
    }
    try{
        const response = await axios.post('http://localhost:5000/register', formData);
        console.log("formdataon sun",formData);
        setFormData({
            name: '',
            role: '',
            email: '',
            number: "",
            password: '',
          });

          setError('')
          fetchUsers();
    }
    catch (error: any) {
        console.error("Error submitting form", error);
        
        if (error.response?.data?.errors) {
          // Handle array of validation errors
          setError(error.response.data.errors.join(', '));
        } else if (error.response?.data?.message) {
          // Handle single error message
          setError(error.response.data.message);
        } else {
          setError('An unexpected error occurred');
        }
      }
  
}
    return (
        <div>
            <h1 className="text-2xl font-semibold ">Users</h1>
            <Container maxWidth="lg" sx={{ mt: 2, mb: 2, p: 1 }}>
                <Grid container spacing={1.5}
                >
                    <Grid size={3}>
                        <FormControl fullWidth>

                            <StyledTextField
                                name='name'
                                label="First and Last Name"
                                value={formData.name}
                                onChange={handleChange}
                            >
                            </StyledTextField>
                        </FormControl>
                    </Grid>
                    <Grid size={3}>
                        <FormControl fullWidth>
                            <StyledInputLabel>Role</StyledInputLabel>
                            <StyledSelect
                                name='role'
                                label="Role"
                                value={formData.role}
                                onChange={handleChange}
                            >
                                {roles.map((role, index) => (
                                    <MenuItem key={index} value={role.value}>{role.label}</MenuItem>
                                ))}
                            </StyledSelect>
                        </FormControl>
                    </Grid>
                    <Grid size={3}>
                        <FormControl fullWidth>
                            <StyledTextField
                                name='number'
                                label="PHONE NUMBER"
                                 type="number"
                                value={formData.number}
                                onChange={handleChange}
                            >

                            </StyledTextField>
                        </FormControl>

                    </Grid>
                    <Grid size={3}>
                        <FormControl fullWidth>
                            <StyledTextField
                                name='email'
                                label="Email"
                                value={formData.email}
                                onChange={handleChange}
                            >

                            </StyledTextField>
                        </FormControl>
                    </Grid>
                    <Grid size={3}>
                        <FormControl fullWidth>
                            <StyledTextField
                                name='password'
                                label="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}

                            >

                            </StyledTextField>
                        </FormControl>
                    </Grid>
                    {error && (
                        <Grid size={12}>
                            <p style={{ color: 'red' }}>{error}</p>
                        </Grid>
                    )}
                    <Grid size={3}>
                        <Button variant="contained" color="primary" sx={{ height: '40px', fontSize: '0.875rem' }}
                                onClick={handleSubmit}>
                            ADD
                        </Button>
                    </Grid>
                </Grid>
            </Container>

            <Container sx={{ mt: 2, mb: 2, p: 1 }}>

                <Grid size={12}>
                    <h2 className="text-xl font-semibold">User List</h2>
                </Grid>

                <Box sx={{ height: 400, width: '100%', mt: 2 }}>
                    <DataGrid columns={columns} rows={users} getRowId={(row)=>row._id}></DataGrid>
                </Box>
            </Container>
        </div>
    )
}

export default AddUser
