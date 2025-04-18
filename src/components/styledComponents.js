// src/components/common/StyledComponents.js

import { InputLabel, Select, styled, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// Styled InputLabel
export const StyledInputLabel = styled(InputLabel)(({ theme }) => ({
  fontSize: '0.75rem !important',
  '&.Mui-focused': {
    fontSize: '0.75rem !important',
  },
}));

// Styled Select
export const StyledSelect = styled(Select)(({ theme }) => ({
  height: '40px',
  '& .MuiSelect-select': {
    fontSize: '0.875rem',
  },
}));

// Styled DatePicker
export const StyledDatePicker = styled(DatePicker)(({ theme }) => ({
  '& .MuiInputBase-root': {
    fontSize: '0.875rem',
    padding: '8px',
    height: '38px',
  },
  '& .MuiInputLabel-root': {
    fontSize: '0.75rem',
    color: theme.palette.text.primary,
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.divider,
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.main,
  },
  '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.main,
  },
}));


export const StyledTextField = styled(TextField)(({ theme }) => ({

    '& .MuiInputLabel-root': {
        fontSize: '0.75rem',
    },
    '& .MuiInputBase-root': {
        fontSize: '0.875rem',
        height: '38px',
    },
}));