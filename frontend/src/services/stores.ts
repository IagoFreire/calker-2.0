import api from '../config/axios';

export interface Store {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface CreateStoreDto {
  name: string;
  email: string;
  password: string;
  admin_name?: string;
}

export interface UpdateStoreDto {
  name: string;
}

export const storesService = {
  getAll: async (): Promise<Store[]> => {
    const response = await api.get('/stores');
    return response.data.stores;
  },

  getById: async (id: string): Promise<Store> => {
    const response = await api.get(`/stores/${id}`);
    return response.data.store;
  },

  create: async (data: CreateStoreDto): Promise<Store> => {
    const response = await api.post('/stores', data);
    return response.data.store;
  },

  update: async (id: string, data: UpdateStoreDto): Promise<Store> => {
    const response = await api.put(`/stores/${id}`, data);
    return response.data.store;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/stores/${id}`);
  },
};
