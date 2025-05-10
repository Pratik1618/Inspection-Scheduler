import { Button, Card, CardActions, CardContent } from '@mui/material'
import { ExternalLink, Trash2 } from 'lucide-react'
import React from 'react'

const FormList:React.FC = () => {
    const forms =[
        {
            id:1,
            name:'Form 1',
            fields:3,
            createdAt:'2023-10-01',
            updatedAt:'2023-10-02'
        },
        {
            id:2,
            name:'Form 2',
            fields:5,
            createdAt:'2023-10-03',
            updatedAt:'2023-10-04'
        },
        {
            id:3,
            name:'Form 3',
            fields:2,
            createdAt:'2023-10-05',
            updatedAt:'2023-10-06'
        }

    ]
  return (
    <div className='space-y-4'>
        {forms.map((form) => (

        
        <Card key={form.id} variant='outlined' sx={{borderRadius:2}} >
            <CardContent sx={{paddingTop:2}}>
                <div>
                    <h3 className='font-medium text-lg'>{form.name}</h3>
                    <p className='text-sm mt-2'>
                        <span className='text-muted-foreground'>Fields:</span>
                        {form.fields}
                    </p>

                </div>
            </CardContent>
            <CardActions sx={{ display:'flex',justifyContent:'space-between',gap:2 ,p:2}}>
                <Button variant='outlined'  sx={{borderRadius:'6px' , color:'black' ,borderColor:'black',textTransform:'none'}}>
                    <ExternalLink className='mr-1 h-4 w-4'/>
              Preview
                    
                </Button>
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
