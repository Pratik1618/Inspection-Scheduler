import React, { useState } from 'react';
import {
    Card,
    CardContent,
    CardActions,
    TextField,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
    Button,
    FormControlLabel,
    Checkbox,
    RadioGroup,
    Radio,
} from '@mui/material';
import { grey } from '@mui/material/colors';

interface FormRendererProps {
    form: any; // Pass the full form object with fields
    onSubmit?: (formData: Record<string, any>) => void; // Optional callback
}

const FormRenderer: React.FC<FormRendererProps> = ({ form, onSubmit }) => {
    const [formData, setFormData] = useState<Record<string, any>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (fieldId: string, value: any) => {
        setFormData((prev) => ({ ...prev, [fieldId]: value }));
        setErrors((prev) => ({ ...prev, [fieldId]: '' }));
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};
        form.fields.forEach((field: any) => {
            const value = formData[field.id];

            if (field.required && (!value || value === '')) {
                newErrors[field.id] = 'This field is required';
            }

            if (field.type === 'email' && value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    newErrors[field.id] = 'Invalid email';
                }
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        console.log('Submitting form:', formData);
        if (onSubmit) onSubmit(formData);
    };

    return (
        <div className='w-2xl mx-auto mt-2'>
            <Typography variant="h4"  fontWeight='bold'>{form.title}</Typography>
            <Typography variant="body2" gutterBottom>{form.description}</Typography>
            <Card sx={{ padding: 2 }}>
                <form onSubmit={handleSubmit}>
                    <CardContent>


                        {form.fields.map((field: any) => (
                            <div key={field.id} style={{ marginBottom: '1rem' }}>
                                {field.type === 'text' || field.type === 'email' || field.type === 'number' ? (
                                    <div>
                                        <Typography component="label" htmlFor='form-title' >{field.label}
                                            {field.required && <span className='text-red-500 ml-1'>*</span>}
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            id={`field-${field.id}`}
                                            type={field.type}
                                            variant="outlined"
                                            size="small"
                                            value={formData[field.id] || ''}
                                            onChange={(e) => handleChange(field.id, e.target.value)}
                                            error={!!errors[field.id]}
                                            helperText={errors[field.id]}
                                        />
                                    </div>
                                ) : null}

                                {field.type === 'textarea' && (
                                    <div>
                                    <Typography component="label" htmlFor='form-title' >{field.label}
                                            {field.required && <span className='text-red-500 ml-1'>*</span>}
                                        </Typography>
                                    <TextField
                                        fullWidth
                                        
                                        multiline
                                        rows={4}
                                        variant="outlined"
                                        size="small"
                                        value={formData[field.id] || ''}
                                        onChange={(e) => handleChange(field.id, e.target.value)}
                                        error={!!errors[field.id]}
                                        helperText={errors[field.id]}
                                    />
                                    </div>
                                )}

                                {field.type === 'select' && (
                                    <FormControl fullWidth error={!!errors[field.id]}>
                                         <Typography component="label" htmlFor='form-title' >{field.label}
                                            {field.required && <span className='text-red-500 ml-1'>*</span>}
                                        </Typography>
                                        <Select
                                        size='small'
                                            value={formData[field.id] || ''}
                                            onChange={(e) => handleChange(field.id, e.target.value)}
                                        >
                                            {field.options.map((opt: any, idx: number) => (
                                                <MenuItem key={idx} value={opt.value}>
                                                    {opt.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        <FormHelperText>{errors[field.id]}</FormHelperText>
                                    </FormControl>
                                )}

                                {field.type === 'checkbox' && (
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={!!formData[field.id]}
                                                onChange={(e) => handleChange(field.id, e.target.checked)}
                                            />
                                        }
                                        label={field.label}
                                    />
                                )}

                                {field.type === 'radio' && (
                                    <FormControl component="fieldset" error={!!errors[field.id]}>
                                        <Typography>{field.label}</Typography>
                                        <RadioGroup
                                            value={formData[field.id] || ''}
                                            onChange={(e) => handleChange(field.id, e.target.value)}
                                        >
                                            {field.options.map((opt: any, idx: number) => (
                                                <FormControlLabel
                                                    key={idx}
                                                    value={opt.value}
                                                    control={<Radio />}
                                                    label={opt.label}
                                                />
                                            ))}
                                        </RadioGroup>
                                        <FormHelperText>{errors[field.id]}</FormHelperText>
                                    </FormControl>
                                )}
                            </div>
                        ))}
                    </CardContent>
                    <CardActions>
                        <Button type="submit" variant="contained" sx={{backgroundColor:grey[900]}} fullWidth >
                            Submit
                        </Button>
                    </CardActions>
                </form>
            </Card>
        </div>
    );
};

export default FormRenderer;
