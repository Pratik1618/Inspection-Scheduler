import { Button, Card, CardContent, FormControlLabel, IconButton, Input, MenuItem, Select, Snackbar, Switch, TextareaAutosize, TextField, Typography } from '@mui/material'
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
import { ExternalLink, Trash2, Plus, MoveUp, MoveDown, Save } from 'lucide-react'
import { textfieldStyle } from '../../constant/style'
import axios from 'axios'
import api from '../../constant/server'

const FormBuilder: React.FC = () => {
    const [formTitle, setFormTitle] = useState("")
    const [formDescription, setFormDescription] = useState("")
    const [errorMessage, setErrorMessage] = useState<string | null>(null); // Error message state
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const [fields, setFields] = useState<any[]>([
        { id: "1", type: "text", label: "Name", placeholder: "Enter your name", required: true, options: [] },
    ])

    const url = api().baseUrl

    const addField = () => {
        const newId = String(fields.length + 1)
        setFields([
            ...fields, {
                id: newId,
                type: 'text',
                label: `Field ${newId}`,
                placeholder: "",
                required: false,
                options: []
            }
        ])
    }
    const updateField = (id: string, updates: any) => {
        setFields(fields.map((field) => (field.id === id ? { ...field, ...updates } : field)))
    }

    const removeField = (id: string) => {
        setFields(fields.filter((field) => field.id !== id))
    }

    const moveField = (id: string, direction: 'up' | 'down') => {
        console.log(id)
        const index = fields.findIndex((field) => field.id === id)
        if ((direction === 'up' && index === 0) || (direction === 'down' && index === fields.length - 1)) {
            return
        }
        const newFields = [...fields]
        const newIndex = direction === 'up' ? index - 1 : index + 1
        const temp = newFields[index]
        newFields[index] = newFields[newIndex]
        newFields[newIndex] = temp
        setFields(newFields)
    }

    const addOption = (fieldId: string) => {
        setFields(
            fields.map((field) => {
                if (field.id === fieldId) {
                    const options = [
                        ...field.options,
                        { value: `option${field.options.length + 1}`, label: `Option ${field.options.length + 1}` }
                    ]
                    return { ...field, options }
                }
                return field
            })
        )
    }
    const updateOption = (fieldId: string, optionIndex: number, updates: any) => {
        setFields(
            fields.map((field) => {
                if (field.id === fieldId) {
                    const options = field.options.map((option: any, i: number) =>
                        i === optionIndex ? { ...option, ...updates } : option,
                    )
                    return { ...field, options }
                }
                return field
            }),
        )
    }

    const removeOption = (fieldId: string, optionIndex: number) => {
        setFields(
            fields.map((field) => {
                if (field.id === fieldId) {
                    const options = field.options.filter((_: any, i: number) => i !== optionIndex)
                    return { ...field, options }
                }
                return field
            }),
        )
    }

    const saveForm = async () => {
        const form = {
            title: formTitle,
            description: formDescription,
            fields
        }
        try {
            const response = await axios.post(`${url}/addForm`, form)
            if (response.status === 201) {
                setErrorMessage(response.data.message)
                setOpenSnackbar(true)
                setFormTitle("");
                setFormDescription("");
                setFields([{ id: "1", type: "text", label: "Name", placeholder: "Enter your name", required: true, options: [] }]);
            }
        }
        catch (error: any) {
            console.log(error, 'error');
            setErrorMessage(error.response.data.message || 'An error occurred')
            setOpenSnackbar(true)
        }
    }
    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };
    return (
        <div className='space-y-6'>
            <div className='space-y-4'>
                <div>
                    <Typography component="label" htmlFor='form-title' >Form Title</Typography>
                    <TextField
                        variant='outlined'
                        size='small'
                        fullWidth
                        sx={textfieldStyle}
                        onChange={(e) => setFormTitle(e.target.value)}
                        id='form-title'
                        placeholder='Enter Form Title' />

                </div>
                <div>
                    <Typography component='label' htmlFor='form-description'>Description (optional)</Typography>
                    <TextField
                        fullWidth
                        variant='outlined'
                        id='form-description'
                        onChange={(e) => setFormDescription(e.target.value)}
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
                                            <TextField variant='outlined' id={`field-${field.id}-label`}
                                                value={field.label}

                                                sx={textfieldStyle}
                                                onChange={(e) => updateField(field.id, { label: e.target.value })}
                                                fullWidth size='small' />
                                        </div>
                                        <div>
                                            <Typography component='label' htmlFor={`field-${field.id}-type`}>Field Type</Typography>
                                            <Select fullWidth size='small'
                                                value={field.type}
                                                sx={{ borderRadius: 2, ...textfieldStyle }}
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

                                                <Typography component='label' htmlFor={`field-${field.id}-placeholder`} >Placeholder</Typography>
                                                <TextField variant='outlined'
                                                    fullWidth sx={textfieldStyle}
                                                    value={field.placeholder || ''}
                                                    onChange={(e) => updateField(field.id, { placeholder: e.target.value })} />
                                            </div>)}
                                    {(field.type === 'select' || field.type === 'radio') && (
                                        <div className='space-y-2'>
                                            <div className='flex justify-between items-center'>
                                                <Typography>Options</Typography>
                                                <Button onClick={() => addOption(field.id)}>
                                                    <Plus className='h-4 w-4 mr-1' />
                                                    Add Option</Button>
                                            </div>

                                            {field.options.length > 0 ? (
                                                field.options.map((option: any, index: number) => (
                                                    <div key={index} className='flex gap-2 items-center'>
                                                        <TextField
                                                            variant='outlined'
                                                            size='small'
                                                            fullWidth
                                                            value={option.label}
                                                            placeholder={`Option ${index + 1}`}
                                                            onChange={(e) =>
                                                                updateOption(field.id, index, {
                                                                    label: e.target.value,
                                                                    value: e.target.value.toLowerCase().replace(/\s+/g, "-"),
                                                                })
                                                            }
                                                        />
                                                        <IconButton
                                                            onClick={() => removeOption(field.id, index)}
                                                            color="error"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </IconButton>
                                                    </div>
                                                ))
                                            ) : (
                                                <Typography variant="body2" color="textSecondary">
                                                    No options added yet
                                                </Typography>
                                            )}
                                        </div>
                                    )}
                                    <div className='flex items-center space-x-2 '>
                                        <FormControlLabel control={<Switch checked={field.required} onChange={(e) => updateField(field.id, { required: e.target.checked })} />} label='Required Field' />

                                    </div>
                                    <div className='flex justify-between'>
                                        <div className='flex gap-2'>
                                            <IconButton sx={{ border: '1px solid', borderColor: 'grey.400', borderRadius: 2 }} size='small' onClick={() => moveField(field.id, 'up')}>
                                                <MoveUp className='h-4 w-4' />
                                            </IconButton>
                                            <IconButton sx={{ border: '1px solid', borderColor: 'grey.400', borderRadius: 2 }} size='small' onClick={() => moveField(field.id, 'down')}>
                                                <MoveDown className='h-4 w-4' />
                                            </IconButton>
                                        </div>

                                        <Button
                                            size='small'
                                            sx={{ color: 'white', backgroundColor: '#f44336', textTransform: 'none' }}
                                            onClick={() => removeField(field.id)}
                                        >
                                            <Trash2 className='h-4 w-4 mr-1' /> Remove
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                    <Button type='button' variant='outlined' fullWidth sx={{ borderColor: 'grey.400', color: 'black', borderRadius: 2 }} onClick={addField}>
                        <Plus className='h-4 w-4 mr-2' />Add Field
                    </Button>
                </div>
                <Button type='button' fullWidth sx={{ color: 'white', backgroundColor: 'black', borderRadius: 2 }} onClick={saveForm}>
                    <Save className='h-4 w-4 mr-2' /> Save Form
                </Button>

            </div>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                message={errorMessage}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            />
        </div>

    )
}

export default FormBuilder
