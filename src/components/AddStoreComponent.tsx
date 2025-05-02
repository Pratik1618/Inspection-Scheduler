import { Box, Button, Container, FormControl, Grid, Menu, MenuItem, SelectChangeEvent } from '@mui/material'
import React, { use, useEffect, useState } from 'react'
import { StyledInputLabel, StyledSelect, StyledTextField } from './styledComponents'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
import api from '../constant/server'
import { Trophy } from 'lucide-react'


interface FormData {
    clientId: string,
    name: string,
    address: string,
    storeCode: string,
    zipcode: number,
    city: string,
    state: string,
    storeManagerId: string,

}

interface Client {
    _id: string,
    clientName:string
}
interface StoreManager{
    _id: string,
    name: string,
    role:string
}
const Columnns = [
    { field: 'clientName', headerName: 'Client Name',flex:1},
    { field: 'name', headerName: 'Store Name' ,flex:1},
    { field: 'address', headerName: 'Address' ,flex:1},
    { field: 'zipcode', headerName: 'Zipcode', flex:1},

    { field: 'city', headerName: 'City' },
    { field: 'state', headerName: 'State' },
    {field:'storeManagerId',headerName:'Store Manager',},
    {
        field: 'actions', headerName: 'Actions',renderCell: (params) => {
            return (
                <div className="flex gap-2 mt-2" >
                    <Button variant="contained" color="primary" size="small">Edit</Button>
                    <Button variant="outlined" color="secondary" size="small">Delete</Button>
                </div>
            )
        }
    }
]

const AddStoreComponent: React.FC = () => {

    const url = api().baseUrl;
    const [stores, setStores] = useState<any[]>([])
    const [clients, setClients] = useState<Client[]>([]);
    const [storeM,setStoreM] = useState<StoreManager[]>([]);

    useEffect(() => {
        fetchStores(),
        fetchClients(),
        fetchStoreManagers()
    },[])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<unknown>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }
  
    const fetchStores = async () => {
        try {
            const response = await axios.get(`${url}/stores`);

            setStores(response.data);
        }catch (error) {
            console.error('Error fetching stores:', error);
        }
    }

    const fetchClients = async () => {
        try{
            const response = await axios.get(`${url}/clients`);
            setClients(response.data)
        
            console.log(response)

        }catch(error){
            console.log(error, 'error');
        }
    }

const fetchStoreManagers = async ()=>{
    try{
        const response = await axios.get(`${url}/users`);
        console.log(response)
        const storeManagers = response.data.filter((user:any) => user.role === 'storeManager')
        setStoreM(storeManagers)
    }catch(error){
        console.log(error,'error')
    }
}

    const handleSubmit = async () => {
        console.log(formData, 'formData')
        try {
            const response = await axios.post(`${url}/addStore`, formData);
            console.log(response.data);
            setFormData({
                name:'',
                storeCode: '',
                address: '',
                zipcode: 0,
                city: '',
                state: '',
                clientId: '',
                storeManagerId: '',
               

            })
        } catch (error) {
            console.error(error);
            setError('Failed to add store. Please try again.');
        }
    }

    const [error, setError] = useState<string>('')
    const [formData, setFormData] = useState<FormData>({
        clientId: '',
        name: '',
        address: '',
        storeCode: '',
        zipcode: 0,
        city: '',
        state: '',
        storeManagerId: '',
        

    });
    return (
        <div>
            <h1 className="text-2xl font-semibold ">Add Store</h1>
            <Container maxWidth="lg" sx={{ mt: 2, mb: 2, p: 1 }}>
                <Grid container spacing={1.5}
                >
                    <Grid size={3}>
                        <FormControl fullWidth>

                            <StyledTextField
                                name='name'
                                label="Store Name"
                                value={formData.name}
                                onChange={handleChange}
                            >
                            </StyledTextField>
                        </FormControl>
                    </Grid>
                    <Grid size={3}>
                        <FormControl fullWidth>
                            <StyledInputLabel>Client Name</StyledInputLabel>
                            <StyledSelect
                                name='clientId'
                                label="Client Name"
                                value={formData.clientId}
                                onChange={handleChange}
                            >
                               {clients.map((clients:{_id:string,clientName:string})=>(
                                <MenuItem key={clients._id} value={clients._id}>
                                    {clients.clientName}
                                </MenuItem>
                               ))}
                            </StyledSelect>
                        </FormControl>
                    </Grid>
                    <Grid size={3}>
                        <FormControl fullWidth>
                            <StyledTextField
                                name='storeCode'
                                label="Store Code"
                                value={formData.storeCode}
                                onChange={handleChange}
                            >

                            </StyledTextField>
                        </FormControl>

                    </Grid>
                    <Grid size={3}>
                        <FormControl fullWidth>
                            <StyledTextField
                                name='address'
                                label="Address"
                                value={formData.address}
                                onChange={handleChange}
                            >

                            </StyledTextField>
                        </FormControl>
                    </Grid>
                    <Grid size={3}>
                        <FormControl fullWidth>
                            <StyledTextField
                                name='zipcode'
                                label="Zipcode"
                               type='number'
                                value={formData.zipcode}
                                onChange={handleChange}

                            >

                            </StyledTextField>
                        </FormControl>
                    </Grid>
                    <Grid size={3}>
                        <FormControl fullWidth>
                            <StyledTextField
                                name='city'
                                label="City"

                                value={formData.city}
                                onChange={handleChange}

                            >

                            </StyledTextField>
                        </FormControl>
                    </Grid>
                    <Grid size={3}>
                        <FormControl fullWidth>
                            <StyledTextField
                                name='state'
                                label="State"
                                value={formData.state}
                                onChange={handleChange}

                            >

                            </StyledTextField>
                        </FormControl>
                    </Grid>
                    <Grid size={3}>
                        <FormControl fullWidth>
                        <StyledInputLabel>Store Manager</StyledInputLabel>
                            <StyledSelect
                                name='storeManagerId'
                                label="Store Manager"
                                value={formData.storeManagerId}
                                onChange={handleChange}

                            >
                                {storeM.map((storeManager)=>(
                                    <MenuItem key={storeManager._id} value={storeManager._id}>
                                        {storeManager.name}
                                    </MenuItem>
                                ))}

                            </StyledSelect>
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
                    <DataGrid columns={Columnns} rows={stores} getRowId={(row) => row._id}></DataGrid>
                </Box>
            </Container>
        </div>
    )
}

export default AddStoreComponent
