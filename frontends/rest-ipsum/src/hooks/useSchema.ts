import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface GenerateSchemaResponse {
  schema: unknown;
  partial: boolean;
  missingFields?: string[];
  suggestions?: Record<string, string[]>;
}

interface GenerateSampleResponse {
  data: unknown;
}

interface GenerateTokenResponse {
  token: string;
  expiresIn: number;
}

const API_URL = 'http://localhost:8081/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const useGenerateSchema = () => {
  return useMutation<GenerateSchemaResponse, Error, { sample: unknown }>({
    mutationFn: async ({ sample }) => {
      const { data } = await api.post('/schema/generate', { sample });
      return data.result;
    },
  });
};

export const useGenerateSample = () => {
  return useMutation<GenerateSampleResponse, Error, { schema: unknown }>({
    mutationFn: async ({ schema }) => {
      const { data } = await api.post('/schema/sample', { schema });
      return data;
    },
  });
};

export const useGenerateToken = () => {
  return useMutation<GenerateTokenResponse, Error, { schema: unknown }>({
    mutationFn: async ({ schema }) => {
      const { data } = await api.post('/schema/register', { schema });
      return data.result;
    },
  });
};

export const useSchemas = () => {
  return useQuery<unknown[], Error>({
    queryKey: ['schemas'],
    queryFn: async () => {
      const { data } = await api.get('/schemas');
      return data;
    },
  });
}; 