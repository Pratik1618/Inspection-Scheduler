import { Card, CardContent, Input, Select, TextareaAutosize, TextField, Typography } from '@mui/material'
import React from 'react'

const FormBuilder: React.FC = () => {
    return (
        <div className='space-y-6'>
            <div className='space-y-4'>
                <div>
                    <Typography >Form Title</Typography>
                    <TextField
                    variant='outlined'
                    size='small'
                        fullWidth
                        sx={{borderRadius:20}}
                        id='form-title'
                        placeholder='Enter Form Title' />

                </div>
                <div>
                    <Typography>Description (optional)</Typography>
                    <TextField
                    fullWidth
                        variant='outlined'
                        id='form-description'
                      
                        placeholder='Enter form description'
                        minRows={3}
                    />

                </div>
                <div className='space-y-4'>
                    <h3 className='text-lg font-medium'>Form Fields</h3>
                    <Card variant='outlined'  sx={{borderRadius:2}}>
                        <CardContent sx={{ paddingTop: 2 }}>
                            <div className='grid gap-4'>
                                <div className='grid grid-cols-2 gap-4'>
                                    <div>
                                        <Typography>Field Label</Typography> 
                                        <TextField variant='outlined' fullWidth  size='small'/>
                                    </div>
                                    <div>
                                        <Typography>Field Type</Typography>
                                        <Select fullWidth size='small'>

                                        </Select>
                                    </div>

                                </div>
                                <div>
                                    <Typography>Placeholder</Typography>
                                    <TextField variant='outlined' fullWidth />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

        </div>
    )
}

export default FormBuilder
