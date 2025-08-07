import axios, { AxiosInstance, AxiosResponse } from 'axios';

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add request interceptor to include auth token
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Add response interceptor for error handling
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Token expired or invalid
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/auth/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Dashboard APIs
  async getDashboardOverview(): Promise<any> {
    const response = await this.api.get('/dashboard/overview');
    return response.data;
  }

  async getDashboardAlerts(): Promise<any> {
    const response = await this.api.get('/dashboard/alerts');
    return response.data;
  }

  async getDashboardBadges(): Promise<any> {
    const response = await this.api.get('/dashboard/badges');
    return response.data;
  }

  // Permit APIs
  async getPermits(params?: any): Promise<any> {
    const response = await this.api.get('/permits', { params });
    return response.data;
  }

  async getPermit(id: string): Promise<any> {
    const response = await this.api.get(`/permits/${id}`);
    return response.data;
  }

  async createPermit(data: any): Promise<any> {
    const response = await this.api.post('/permits', data);
    return response.data;
  }

  async updatePermitStatus(id: string, status: string, comments?: string): Promise<any> {
    const response = await this.api.patch(`/permits/${id}/status`, { status, comments });
    return response.data;
  }

  async approvePermit(id: string, comments?: string): Promise<any> {
    return this.updatePermitStatus(id, 'APPROVED', comments);
  }

  async rejectPermit(id: string, comments?: string): Promise<any> {
    return this.updatePermitStatus(id, 'REJECTED', comments);
  }

  // Notification APIs
  async getNotifications(params?: any): Promise<any> {
    const response = await this.api.get('/notifications', { params });
    return response.data;
  }

  async markNotificationAsRead(id: string): Promise<any> {
    const response = await this.api.patch(`/notifications/${id}/read`);
    return response.data;
  }

  async markNotificationAsUnread(id: string): Promise<any> {
    const response = await this.api.patch(`/notifications/${id}/unread`);
    return response.data;
  }

  async deleteNotification(id: string): Promise<any> {
    const response = await this.api.delete(`/notifications/${id}`);
    return response.data;
  }

  async acknowledgeNotification(id: string): Promise<any> {
    const response = await this.api.patch(`/notifications/${id}/acknowledge`);
    return response.data;
  }

  async createNotification(data: any): Promise<any> {
    const response = await this.api.post('/notifications', data);
    return response.data;
  }

  // User APIs
  async getUsers(params?: any): Promise<any> {
    const response = await this.api.get('/users', { params });
    return response.data;
  }

  async getUser(id: string): Promise<any> {
    const response = await this.api.get(`/users/${id}`);
    return response.data;
  }

  async createUser(data: any): Promise<any> {
    const response = await this.api.post('/users', data);
    return response.data;
  }

  async updateUser(id: string, data: any): Promise<any> {
    const response = await this.api.put(`/users/${id}`, data);
    return response.data;
  }

  async deleteUser(id: string): Promise<any> {
    const response = await this.api.delete(`/users/${id}`);
    return response.data;
  }

  // Company APIs
  async getCompanies(params?: any): Promise<any> {
    const response = await this.api.get('/companies', { params });
    return response.data;
  }

  async getCompany(id: string): Promise<any> {
    const response = await this.api.get(`/companies/${id}`);
    return response.data;
  }

  async createCompany(data: any): Promise<any> {
    const response = await this.api.post('/companies', data);
    return response.data;
  }

  async updateCompany(id: string, data: any): Promise<any> {
    const response = await this.api.put(`/companies/${id}`, data);
    return response.data;
  }

  // Payment APIs
  async getPayments(params?: any): Promise<any> {
    const response = await this.api.get('/payments', { params });
    return response.data;
  }

  async getPayment(id: string): Promise<any> {
    const response = await this.api.get(`/payments/${id}`);
    return response.data;
  }

  async createPayment(data: any): Promise<any> {
    const response = await this.api.post('/payments', data);
    return response.data;
  }

  async updatePaymentStatus(id: string, status: string): Promise<any> {
    const response = await this.api.patch(`/payments/${id}/status`, { status });
    return response.data;
  }

  // Personnel APIs
  async getPersonnel(params?: any): Promise<any> {
    const response = await this.api.get('/personnel', { params });
    return response.data;
  }

  async getPersonnelRecord(id: string): Promise<any> {
    const response = await this.api.get(`/personnel/${id}`);
    return response.data;
  }

  async createPersonnelRecord(data: any): Promise<any> {
    const response = await this.api.post('/personnel', data);
    return response.data;
  }

  async updatePersonnelRecord(id: string, data: any): Promise<any> {
    const response = await this.api.put(`/personnel/${id}`, data);
    return response.data;
  }

  // JV (Joint Venture) APIs
  async getJVs(params?: any): Promise<any> {
    const response = await this.api.get('/jv', { params });
    return response.data;
  }

  async getJV(id: string): Promise<any> {
    const response = await this.api.get(`/jv/${id}`);
    return response.data;
  }

  async createJV(data: any): Promise<any> {
    const response = await this.api.post('/jv', data);
    return response.data;
  }

  async updateJV(id: string, data: any): Promise<any> {
    const response = await this.api.put(`/jv/${id}`, data);
    return response.data;
  }

  // Local Content APIs
  async getLocalContentPlans(params?: any): Promise<any> {
    const response = await this.api.get('/localcontent/plans', { params });
    return response.data;
  }

  async getLocalContentPlan(id: string): Promise<any> {
    const response = await this.api.get(`/localcontent/plans/${id}`);
    return response.data;
  }

  async createLocalContentPlan(data: any): Promise<any> {
    const response = await this.api.post('/localcontent/plans', data);
    return response.data;
  }

  async updateLocalContentPlan(id: string, data: any): Promise<any> {
    const response = await this.api.put(`/localcontent/plans/${id}`, data);
    return response.data;
  }

  // Document APIs
  async getDocuments(params?: any): Promise<any> {
    const response = await this.api.get('/documents', { params });
    return response.data;
  }

  async uploadDocument(formData: FormData): Promise<any> {
    const response = await this.api.post('/documents/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  async downloadDocument(id: string): Promise<any> {
    const response = await this.api.get(`/documents/${id}/download`, {
      responseType: 'blob',
    });
    return response;
  }

  // Inspection APIs
  async getInspections(params?: any): Promise<any> {
    const response = await this.api.get('/inspections', { params });
    return response.data;
  }

  async getInspection(id: string): Promise<any> {
    const response = await this.api.get(`/inspections/${id}`);
    return response.data;
  }

  async createInspection(data: any): Promise<any> {
    const response = await this.api.post('/inspections', data);
    return response.data;
  }

  async updateInspection(id: string, data: any): Promise<any> {
    const response = await this.api.put(`/inspections/${id}`, data);
    return response.data;
  }

  // Generic API method for custom endpoints
  async get(endpoint: string, params?: any): Promise<any> {
    const response = await this.api.get(endpoint, { params });
    return response.data;
  }

  async post(endpoint: string, data?: any): Promise<any> {
    const response = await this.api.post(endpoint, data);
    return response.data;
  }

  async put(endpoint: string, data?: any): Promise<any> {
    const response = await this.api.put(endpoint, data);
    return response.data;
  }

  async patch(endpoint: string, data?: any): Promise<any> {
    const response = await this.api.patch(endpoint, data);
    return response.data;
  }

  async delete(endpoint: string): Promise<any> {
    const response = await this.api.delete(endpoint);
    return response.data;
  }
}

// Export singleton instance
export const apiService = new ApiService();
export default apiService;