import { Box, Button, Container, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { StyledTextField } from '../components/styledComponents'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'

interface FormData {
    clientName: string,
}
const Columns = [
    { field: 'clientName', headerName: 'Client Name', flex: 1 },
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
]
const AddClient: React.FC = () => {

    function maxNum(arr){
        let max = arr[0];
        for(let i=0;i<arr.length;i++){
            if(arr[i]>max){
                max=arr[i]
              
            }

        }
        return max;
    }
    console.log(maxNum([1,2,3,4,5]));

    function minNum(arr){

        let min = arr[0];
        for(let i=0;i<arr.length;i++){
            if(arr[i]<min){
                min=arr[i]
            }
        };
        return min;
    }
    console.log(minNum([1,2,3,4,5]));
function reverse(str:string){
    return str.split('').reverse().join('')
}
console.log(reverse(`oppo`));

function palindrome(str){
    const reversed = str.split('').reverse().join('');
    return str === reversed;
}
function anagaram(str1,str2){
    const sortedStr1 = str1.split('').sort().join('');
    const sortedStr2 = str2.split('').sort().join('');
    return sortedStr1 === sortedStr2;
}
console.log(palindrome('oppo'));
console.log(anagaram('oppo','poop'));

    const [client,setClient] = useState<any[]>([]);

    const [formData, setFormData] = useState<FormData>({
        clientName: '',
    })

    useEffect(()=>{
        fetchClients();
    },[])

    const fetchClients = async () => {
        try{
            const response = await axios.get('http://localhost:5000/clients');
            
            setClient(response.data)
        }catch(error){
            console.log(error, 'error');
        }
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSubmit = async () => {
        console.log(formData, 'formData');
        if (formData.clientName === '') {
            alert('Please enter client name')
            return;

        }

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:5000/createClient', formData,{
                headers:{
                    Authorization : `Bearer ${token}`
                }
            })
            fetchClients();
            setFormData({
                clientName: ''
            })
         
        }
        catch (error: any) {
            console.log(error, 'error');
            alert(error.response.data.message)
        }
    }
    return (
        <div>
            <h1 className='text-2xl font-semibold '>Add Client</h1>
            <Container maxWidth="lg" sx={{ mt: 2, mb: 2, p: 1 }}>
                <Grid container spacing={1.5}>
                    <Grid size={3}>
                        <StyledTextField
                            fullWidth
                            name="clientName"
                            value={formData.clientName}
                            onChange={handleChange}
                            label="Client Name">
                        </StyledTextField>
                    </Grid>
                    <Grid size={3}>
                        <Button variant="contained" color="primary"
                            onClick={handleSubmit}
                        >ADD</Button>
                    </Grid>
                </Grid>
            </Container>

            <Container sx={{ mt: 2, mb: 2, p: 1 }}>
                <h1 className='text-xl font-semibold '>Client List</h1>

                <Box sx={{ height: 400, width: '100%', mt: 2 }}>
                    <DataGrid columns={Columns} rows={client} getRowId={(row) => row._id}></DataGrid>
                </Box>
            </Container>
        </div>
    )
}

export default AddClient
