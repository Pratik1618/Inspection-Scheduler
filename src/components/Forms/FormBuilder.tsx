import { Button, Card, CardContent, FormControlLabel, IconButton, Input, MenuItem, Select, Switch, TextareaAutosize, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
const FIELD_TYPES = [
    { value: "text", label: "Text" },
    { value: "textarea", label: "Text Area" },
    { value: "number", label: "Number" },
    { value: "email", label: "Email" },
    { value: "select", label: "Dropdown" },
    { value: "checkbox", label: "Checkbox" },
    { value: "radio", label: "Radio Buttons" },
]
import { ExternalLink, Trash2 ,Plus, MoveUp, MoveDown, Save} from 'lucide-react'
import { textfieldStyle } from '../../constant/style'

const FormBuilder: React.FC = () => {
    const [fields, setFields] = useState<any[]>([
        { id: "1", type: "text", label: "Name", placeholder: "Enter your name", required: true, options: [] },
    ])
    const updateField = (id: string, updates: any) => {
        setFields(fields.map((field) => (field.id === id ? { ...field, ...updates } : field)))
    }

    return (
        <div className='space-y-6'>
            <div className='space-y-4'>
                <div>
                    <Typography >Form Title</Typography>
                    <TextField
                        variant='outlined'
                        size='small'
                        fullWidth
                        sx={textfieldStyle}
                        id='form-title'
                        placeholder='Enter Form Title' />

                </div>
                <div>
                    <Typography>Description (optional)</Typography>
                    <TextField
                        fullWidth
                        variant='outlined'
                        id='form-description'
                        sx={textfieldStyle}
                        placeholder='Enter form description'
                        minRows={3}
                    />

                </div>
                <div className='space-y-4'>
                    <h3 className='text-lg font-medium'>Form Fields</h3>
                    {fields.map((field) => (


                        <Card key={field.id} variant='outlined' sx={{ borderRadius: 2 }}>
                            <CardContent sx={{ paddingTop: 2 }}>
                                <div className='grid gap-4'>
                                    <div className='grid grid-cols-2 gap-4'>
                                        <div>
                                            <Typography component='label' htmlFor={`field-${field.id}-label`}> Field Label</Typography>
                                            <TextField variant='outlined'   id={`field-${field.id}-label`} 
                                            value={field.label}
                                            sx={textfieldStyle}
                                            onChange={(e) => updateField(field.id, { label: e.target.value })}
                                            fullWidth size='small' />
                                        </div>
                                        <div>
                                            <Typography>Field Type</Typography>
                                            <Select fullWidth size='small'
                                                value={field.type}
                                                onChange={(event) => {
                                                    const newType = event.target.value;
                                                    updateField(field.id, {
                                                        type: newType,
                                                        options: newType === 'select' || newType === 'radio' ? field.options : []
                                                    });
                                                }}
                                            >
                                                {
                                                    FIELD_TYPES.map((type) => (
                                                        <MenuItem key={type.value} value={type.value}>
                                                            {type.label}
                                                        </MenuItem>
                                                    ))
                                                }
                                            </Select>
                                        </div>

                                    </div>

                                    {(field.type === "text" ||
                                        field.type === "textarea" ||
                                        field.type === "number" ||
                                        field.type === "email") && (
                                            <div>

                                                <Typography>Placeholder</Typography>
                                                <TextField variant='outlined' fullWidth sx={textfieldStyle}/>
                                            </div>)}
                                            {(field.type ==='select' || field.type ==='radio')&&(
                                                <div className='space-y-2'>
                                                    <div className='flex justify-between items-center'>
                                                    <Typography>Options</Typography>
                                                    <Button>
                                                        <Plus className='h-4 w-4 mr-1' />
                                                         Add Option</Button>
                                                         </div>
                                                </div>
                                            )}
                                            <div className='flex items-center space-x-2 '>
                                       <FormControlLabel control={<Switch/>} label='Required Field'/>

                                            </div>
                                            <div className='flex justify-between'>
                                                <div className='flex gap-2'>
                                                <IconButton sx={{border:'1px solid' ,borderColor:'grey.400',borderRadius:2}} size='small' >
                                                    <MoveUp className='h-4 w-4'/>
                                                </IconButton>
                                                <IconButton sx={{border:'1px solid' ,borderColor:'grey.400',borderRadius:2}} size='small'>
                                                    <MoveDown className='h-4 w-4'/>
                                                </IconButton>
                                                </div>
                                                
                                               <Button
                                             size='small'
                                             sx={{color:'white',backgroundColor:'#f44336',textTransform:'none'}}

                                               >
                                                    <Trash2 className='h-4 w-4 mr-1'/> Remove
                                               </Button>
                                            </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                    <Button type='button' variant='outlined' fullWidth sx={{borderColor:'grey.400',color:'black',borderRadius:2}} >
                        <Plus className='h-4 w-4 mr-2'/>Add Field
                    </Button>
                </div>
                <Button type='button'   fullWidth sx={{color:'white',backgroundColor:'black',borderRadius:2}}>
                    <Save className='h-4 w-4 mr-2'/> Save Form
                </Button>
            </div>

        </div>
    )
}

export default FormBuilder
