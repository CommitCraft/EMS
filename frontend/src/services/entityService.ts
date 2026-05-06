import { api } from './api';
import { ApiResponse, PaginationMeta } from '../types';

export interface ListResponse<T> {
  success: boolean;
  data: T[];
  meta: PaginationMeta;
}

export const entityService = {
  list: async <T>(endpoint: string, params?: Record<string, string | number | undefined>) => {
    try {
      return (await api.get<ListResponse<T>>(`${endpoint}`, { params })).data;
    } catch (err: any) {
      const message = err?.response?.data?.message || err.message || 'List request failed';
      throw new Error(message);
    }
  },
  create: async <T>(endpoint: string, payload: Record<string, unknown>) => {
    try {
      return (await api.post<ApiResponse<T>>(`${endpoint}`, payload)).data;
    } catch (err: any) {
      const message = err?.response?.data?.message || err.message || 'Create request failed';
      throw new Error(message);
    }
  },
  update: async <T>(endpoint: string, id: number, payload: Record<string, unknown>) => {
    try {
      return (await api.put<ApiResponse<T>>(`${endpoint}/${id}`, payload)).data;
    } catch (err: any) {
      const message = err?.response?.data?.message || err.message || 'Update request failed';
      throw new Error(message);
    }
  },
  remove: async (endpoint: string, id: number) => {
    try {
      return (await api.delete<ApiResponse<null>>(`${endpoint}/${id}`)).data;
    } catch (err: any) {
      const message = err?.response?.data?.message || err.message || 'Delete request failed';
      throw new Error(message);
    }
  },
  options: async <T>(endpoint: string) => {
    try {
      return (await api.get<ApiResponse<T[]>>(endpoint)).data;
    } catch (err: any) {
      const message = err?.response?.data?.message || err.message || 'Options request failed';
      throw new Error(message);
    }
  },
};
