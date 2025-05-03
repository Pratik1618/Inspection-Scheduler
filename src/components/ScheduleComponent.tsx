import React, { useEffect, useState } from 'react'
import { Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Snackbar, styled, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import axios from 'axios';
import { StyledDatePicker, StyledInputLabel, StyledSelect } from './styledComponents';
import store from '../../../Scheduler-Backend/model/store';
import dayjs, { Dayjs } from 'dayjs';
import { set } from 'mongoose';
import { Store } from 'lucide-react';
import api from '../constant/server';

const columns = [
  { field: 'ticketNo', headerName: 'Ticket No', width: 120 },

  { field: 'clientName', headerName: 'Client', width: 150 },
  { field: 'storeName', headerName: 'Store Name', width: 200 },
  { field: 'storeCode', headerName: 'Store Code', width: 150 },
  { field: 'scheduleFor', headerName: 'Schedule For', width: 150 },
  { field: 'technicianName', headerName: 'Technician Name', width: 200 },
  { field: 'email', headerName: 'Email', width: 220 },
  { field: 'phone', headerName: 'Phone', width: 150 },
  { field: 'scheduleDate', headerName: 'Schedule Date', width: 160 },
  { field: 'status', headerName: 'Status', width: 140 },
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
  _id: number,
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


const scheduleFor: ScheduleFor[] = [
  { value: 'inspection', label: 'Inspection' },
  { value: 'ppm', label: 'PPM' },
  { value: 'breakdown', label: 'Breakdown' },
  { value: 'installation', label: 'Installation' },

]




const ScheduleComponent: React.FC = () => {
  const url = api().baseUrl
  const [technician, setTechnician] = React.useState<Technician[]>([])
  const [clients, setClients] = useState<any[]>([]);
  const [stores, setStores] = useState<any[]>([]);
  const [selectedClient, setSelectedClient] = useState('');
  const [selectedStore, setSelectedStore] = useState('');
  const [scheduleType, setScheduleType] = useState('');
  const [scheduleDate, setScheduleDate] = useState<any>(null);
  const [selectedTechnician, setSelectedTechnician] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState('');
  const [schedule, setSchedule] = useState<any[]>([]);

  useEffect(() => {
    // Fetch technicians
    const fetchTechnicians = async () => {
      try {
        const response = await axios.get(`${url}/users`);
        const technician = response.data.filter((user: Technician) => user.role === 'technician');
        setTechnician(technician);
      } catch (error) {
        console.error('Error fetching technicians:', error);
      }
    };


    const fetchClientsAndStores = async () => {
      try {
        const clientResponse = await axios.get(`${url}/clients`);
        setClients(clientResponse.data);

        const storeResponse = await axios.get(`${url}/stores`);
        setStores(storeResponse.data)




      } catch (error) {
        console.error('Error fetching clients or stores:', error);
      }
    };

    console.log(stores, 'stores')


    fetchSchedule();
    fetchTechnicians();
    fetchClientsAndStores();
  }, []);


  const fetchSchedule = async () => {
    try {
      const response = await axios.get(`${url}/schedules`);
      const formattedData = response.data.map((schedule: any) => ({
        ...schedule,
        clientName: schedule.storeId.clientId.clientName || 'N/A',
        storeName: schedule.storeId.name || 'N/A',
        storeCode: schedule.storeId.storeCode || 'N/A',
        scheduleFor: schedule.scheduleType || 'N/A',
        technicianName: schedule.technicianId.name || 'N/A',
        email: schedule.technicianId.email || 'N/A',
        phone: schedule.technicianId.number || 'N/A',
        scheduleDate: dayjs(schedule.scheduleDate).format('YYYY-MM-DD'),

      }))
      setSchedule(formattedData);
    } catch (error) {
      console.error('Error fetching schedule:', error);
    }
  }

  const filterdStores = stores.filter((store) => store.clientId.clientName === selectedClient);
  const handleChange = (event: React.ChangeEvent<{ name: unknown; value: unknown }> | SelectChangeEvent<unknown>) => {
    const { name, value } = event.target;

    switch (name) {
      case 'client':
        setSelectedClient(value as string);
        break;
      case 'storeId':
        setSelectedStore(value as string);
        break;
      case 'scheduleFor':
        setScheduleType(value as string);
        break;
      case 'technician':
        setSelectedTechnician(value as string);
        break;

      default:
        break;
    }
  };
  const handleDateChange = (date: Dayjs | null) => {
    setScheduleDate(date);
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${url}/createSchedule`, {
        scheduleType,
        storeId: selectedStore,
        technicianId: selectedTechnician,
        scheduleDate: scheduleDate
      },{
        headers:{
          Authorization : `Bearer ${token}`
        }
      },)

      setMessage(response.data.message);
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error scheduling:', error);
      setMessage(error.response.data.message)
      setOpenSnackbar(true);

    }
    fetchSchedule();
  }
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
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
                value={selectedClient}
                onChange={handleChange}
              >
                {clients.map((client) => (
                  <MenuItem key={client._id} value={client.clientName}>
                    {client.clientName}
                  </MenuItem>
                ))}
              </StyledSelect>
            </FormControl>
          </Grid>
          <Grid size={3}>
            <FormControl fullWidth>
              <StyledInputLabel>Store Name</StyledInputLabel>
              <StyledSelect
                name='storeId'
                label="Store Name"
                value={selectedStore}
                onChange={handleChange}
              >
                {filterdStores
                  .map((store) => (
                    <MenuItem key={store._id} value={store._id}>
                      {store.name}
                    </MenuItem>
                  ))}
              </StyledSelect>
            </FormControl>
          </Grid>
          <Grid size={3}>
            <FormControl fullWidth>
              <StyledInputLabel>Schedule For</StyledInputLabel>
              <StyledSelect
                name='scheduleFor'
                label="Schedule For"
                value={scheduleType}
                onChange={handleChange}
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
                name='technician'
                label="Technician Name"
                value={selectedTechnician}
                onChange={handleChange}
              >
                {technician.map((tech) => (
                  <MenuItem key={tech._id} value={tech._id}>
                    {tech.name}
                  </MenuItem>
                ))}
              </StyledSelect>
            </FormControl>
          </Grid>
          <Grid size={3}>
            <FormControl fullWidth>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StyledDatePicker
                  name='scheduleDate'
                  value={scheduleDate}
                  onChange={handleDateChange}
                >

                </StyledDatePicker>
              </LocalizationProvider>
            </FormControl>
          </Grid>
          <Grid size={3}>
            <Button variant="contained" color="primary" sx={{ height: '40px', fontSize: '0.875rem' }} onClick={handleSubmit}>
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
          <DataGrid columns={columns} rows={schedule} getRowId={(row) => row._id} ></DataGrid>
        </Box>
      </Container>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={message}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
    </div>
  )
}

export default ScheduleComponent
