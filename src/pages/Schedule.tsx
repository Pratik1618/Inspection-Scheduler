import React, { useEffect } from 'react'
import { Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, styled, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import axios from 'axios';
import { StyledDatePicker, StyledInputLabel, StyledSelect } from '../components/styledComponents';

const columns = [
  { field: 'id', headerName: 'Ticket No', width: 120 },
  { field: 'zone', headerName: 'Zone', width: 150 },
  { field: 'ClientName', headerName: 'Client', width: 150 },
  { field: 'StoreName', headerName: 'Store Name', width: 200 },
  { field: 'StoreCode', headerName: 'Store Code', width: 150 },
  { field: 'scheduleFor', headerName: 'Schedule For', width: 150 },
  { field: 'TechnicianName', headerName: 'Technician Name', width: 200 },
  { field: 'email', headerName: 'Email', width: 220 },
  { field: 'Phone', headerName: 'Phone', width: 150 },
  { field: 'ScheduleDate', headerName: 'Schedule Date', width: 160 },
  { field: 'Status', headerName: 'Status', width: 140 },
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
];

interface Technician {
  id: number,
  name: string,
  email: string,
  phone: string,
  role: string,
}

interface ScheduleFor {
  value: string;
  label: string;
}

interface RowData {
  id: number;
  zone: string;
  ClientName: string;
  StoreName: string;
  StoreCode: string;
  scheduleFor: string;
  TechnicianName: string;
  email: string;
  Phone: string;
  ScheduleDate: string;
  Status: string;
}
const rows = [
  {
    id: 1,
    zone: 'North',
    ClientName: 'ABC Corp',
    StoreName: 'Main Street Outlet',
    StoreCode: 'MS001',
    scheduleFor: 'Installation',
    TechnicianName: 'John Doe',
    email: 'john@example.com',
    Phone: '123-456-7890',
    ScheduleDate: '2025-04-20',
    Status: 'Scheduled',
  },
  {
    id: 2,
    zone: 'South',
    ClientName: 'XYZ Ltd',
    StoreName: 'Downtown Plaza',
    StoreCode: 'DP002',
    scheduleFor: 'Maintenance',
    TechnicianName: 'Jane Smith',
    email: 'jane@example.com',
    Phone: '987-654-3210',
    ScheduleDate: '2025-04-22',
    Status: 'In Progress',
  },
  {
    id: 3,
    zone: 'West',
    ClientName: 'Techtronix',
    StoreName: 'Westside Store',
    StoreCode: 'WS003',
    scheduleFor: 'Repair',
    TechnicianName: 'Ali Khan',
    email: 'ali@example.com',
    Phone: '555-123-4567',
    ScheduleDate: '2025-04-25',
    Status: 'Completed',
  },
];

const scheduleFor: ScheduleFor[] = [
  { value: 'inspection1', label: 'Inspection-1' },
  { value: 'inspection2', label: 'Inspection-2' },
  { value: 'ppmMonthly', label: 'PPM Monthly' },
  { value: 'ppmQuarterly', label: 'PPM Quarterly' },
  { value: 'ppmHalfYearly', label: 'PPM Half Yearly' },
  { value: 'ppmYearly', label: 'PPM Yearly' },
  { value: 'breakdown', label: 'Breakdown' },
  { value: 'installation', label: 'Installation' },

]




const Schedule: React.FC = () => {
  const [technician, setTechnician] = React.useState<Technician[]>([])

  useEffect(() => {
    const fetchTechnicians = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users')

        const technician = response.data.filter((user: Technician) => user.role === 'technician')

        setTechnician(technician)

      } catch (error) {
        console.error('Error fetching technicians:', error)
      }
    };
    fetchTechnicians();
  }, [])
  return (
    <div>
      <h1 className="text-2xl font-semibold ">Schedule</h1>
      <Container maxWidth="lg" sx={{ mt: 2, mb: 2, p: 1 }}>
        <Grid container spacing={1.5}
        >
          <Grid size={3}>
            <FormControl fullWidth>
              <StyledInputLabel>Client</StyledInputLabel>
              <StyledSelect
                name='client'
                label="Client"
              >

              </StyledSelect>
            </FormControl>
          </Grid>
          <Grid size={3}>
            <FormControl fullWidth>
              <StyledInputLabel>Store Name</StyledInputLabel>
              <StyledSelect
                name='client'
                label="Store Name"
              >

              </StyledSelect>
            </FormControl>
          </Grid>
          <Grid size={3}>
            <FormControl fullWidth>
              <StyledInputLabel>Schedule For</StyledInputLabel>
              <StyledSelect
                name='client'
                label="Schedule For"
              >
                {
                  scheduleFor.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))
                }
              </StyledSelect>
            </FormControl>
          </Grid>
          <Grid size={3}>
            <FormControl fullWidth>
              <StyledInputLabel>Technician Name</StyledInputLabel>
              <StyledSelect
                name='client'
                label="Technician Name"
              >
                {technician.map((tech) => (
                  <MenuItem key={tech.id} value={tech.name}>
                    {tech.name}
                  </MenuItem>
                ))}
              </StyledSelect>
            </FormControl>
          </Grid>
          <Grid size={3}>
            <FormControl fullWidth>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StyledDatePicker></StyledDatePicker>
              </LocalizationProvider>
            </FormControl>
          </Grid>
          <Grid size={3}>
            <Button variant="contained" color="primary" sx={{ height: '40px', fontSize: '0.875rem' }}>
              Schedule
            </Button>
          </Grid>
        </Grid>
      </Container>

      <Container sx={{ mt: 2, mb: 2, p: 1 }}>

        <Grid size={12}>
          <h2 className="text-xl font-semibold">Scheduled Appointments</h2>
        </Grid>

        <Box sx={{ height: 400, width: '100%', mt: 2 }}>
          <DataGrid columns={columns} rows={rows}></DataGrid>
        </Box>
      </Container>
    </div>
  )
}

export default Schedule
