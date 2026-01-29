import api from '../config/axios';

export interface Appointment {
  id: string;
  store_id: string;
  title: string;
  description?: string;
  start_time: string;
  end_time: string;
  client_name?: string;
  client_email?: string;
  client_phone?: string;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
  created_by?: string;
  created_by_email?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateAppointmentDto {
  title: string;
  description?: string;
  start_time: string;
  end_time: string;
  client_name?: string;
  client_email?: string;
  client_phone?: string;
  status?: 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
}

export interface UpdateAppointmentDto extends Partial<CreateAppointmentDto> {}

export const appointmentsService = {
  getAll: async (): Promise<Appointment[]> => {
    const response = await api.get('/appointments');
    return response.data.appointments;
  },

  getById: async (id: string): Promise<Appointment> => {
    const response = await api.get(`/appointments/${id}`);
    return response.data.appointment;
  },

  create: async (data: CreateAppointmentDto): Promise<Appointment> => {
    const response = await api.post('/appointments', data);
    return response.data.appointment;
  },

  update: async (id: string, data: UpdateAppointmentDto): Promise<Appointment> => {
    const response = await api.put(`/appointments/${id}`, data);
    return response.data.appointment;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/appointments/${id}`);
  },
};
