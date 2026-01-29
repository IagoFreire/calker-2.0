import api from '../config/axios';

export interface User {
  id: string;
  name?: string;
  email: string;
  role: 'super_admin' | 'store_admin' | 'user';
  store_id?: string;
  store_name?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateUserDto {
  name?: string;
  email: string;
  password: string;
  role?: 'super_admin' | 'store_admin' | 'user';
  store_id?: string;
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
  password?: string;
  role?: 'super_admin' | 'store_admin' | 'user';
  store_id?: string;
}

export const usersService = {
  getAll: async (storeId?: string): Promise<User[]> => {
    const params = storeId ? { store_id: storeId } : {};
    const response = await api.get('/users', { params });
    return response.data.users;
  },

  getById: async (id: string): Promise<User> => {
    const response = await api.get(`/users/${id}`);
    return response.data.user;
  },

  create: async (data: CreateUserDto): Promise<User> => {
    const response = await api.post('/users', data);
    return response.data.user;
  },

  update: async (id: string, data: UpdateUserDto): Promise<User> => {
    const response = await api.put(`/users/${id}`, data);
    return response.data.user;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/users/${id}`);
  },
};
