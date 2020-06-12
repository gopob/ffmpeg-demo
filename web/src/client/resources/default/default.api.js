import { apiClient } from 'services/api';

export const getThumbnail = (data) => apiClient
  .get('/thumbnail/', data);
