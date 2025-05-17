import { Button, Card, CardActions, CardContent } from '@mui/material'
import axios from 'axios';
import { ExternalLink, Trash2,Copy } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import api from '../../constant/server';
import { Link } from 'react-router-dom';

const FormList:React.FC = () => {
   const [forms,setForms] = useState<any[]>([]);
    const url = api().baseUrl

   useEffect(()=>{
    const fetchForms = async ()=>{
        try{
            const response = await axios.get(`${url}/getForms`);
            setForms(response.data);
            console.log(response.data)
        }catch(err:any){
            console.log('fetch error:',err)
        }
    };
    fetchForms()
   },[url])
  return (
    <div className='space-y-4'>
        {forms.map((form,index) => (

        
        <Card key={form._id} variant='outlined' sx={{borderRadius:2}} >
            <CardContent sx={{paddingTop:2}}>
                <div>
                    <h3 className='font-medium text-lg'>{form.title}</h3>
                    <p className='text-sm mt-2'>
                        <span className='text-muted-foreground'>Fields:</span>
                        {form.fields.length}
                    </p>

                </div>
            </CardContent>
            <CardActions sx={{ display:'flex',justifyContent:'space-between',gap:2 ,p:2}}>
                <Link to ={`/form-preview/Z${form._id}`} >
                <Button variant='outlined'  sx={{borderRadius:'6px' , color:'black' ,borderColor:'black',textTransform:'none'}}>
                    <ExternalLink className='mr-1 h-4 w-4'/>
              Preview
                    
                </Button>
                </Link>
                <Button sx={{backgroundColor:'#f44336',color:'white' ,borderRadius:'6px', textTransform:'none' }}>
                    <Trash2 className='mr-1 h-4 w-4'/>
                Delete
                    
                </Button>

            </CardActions>
        </Card>
        ))}
    </div>
  )
}

export default FormList
