import { Card, CardContent, Input, Select, TextareaAutosize, Typography } from '@mui/material'
import React from 'react'

const FormBuilder: React.FC = () => {
    return (
        <div className='space-y-6'>
            <div className='space-y-4'>
                <div>
                    <Typography >Form Title</Typography>
                    <Input
                        fullWidth
                        id='form-title'
                        placeholder='Enter Form Title' />

                </div>
                <div>
                    <Typography>Description (optional)</Typography>
                    <TextareaAutosize
                        id='form-description'
                        style={{ width: '100%' }}
                        placeholder='Enter form description'
                        minRows={3}
                    />

                </div>
                <div className='space-y-4'>
                    <h3 className='text-lg font-medium'>Form Fields</h3>
                    <Card >
                        <CardContent sx={{ paddingTop: 6 }}>
                            <div className='grid gap-4'>
                                <div className='grid grid-cols-2 gap-4'>
                                    <div>
                                        <Typography>Field Label</Typography>
                                        <Input fullWidth />
                                    </div>
                                    <div>
                                        <Typography>Field Type</Typography>
                                        <Select fullWidth>

                                        </Select>
                                    </div>

                                </div>
                                <div>
                                    <Typography>Placeholder</Typography>
                                    <Input fullWidth />
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
