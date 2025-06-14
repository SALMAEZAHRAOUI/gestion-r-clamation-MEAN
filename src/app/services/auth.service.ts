import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private API_URL = 'http://localhost:5000/api/auth';

  constructor() {}

  // Décodage sans bibliothèque externe
  decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      const decodedPayload = atob(payload);
      return JSON.parse(decodedPayload);
    } catch (error) {
      throw new Error('Erreur lors du décodage du token');
    }
  }

  async register(user: any): Promise<any> {
    try {
      const response = await axios.post(`${this.API_URL}/register`, user);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  }

  async login(credentials: any): Promise<any> {
    try {
      const response = await axios.post(`${this.API_URL}/login`, credentials);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  }

  async addResponsable(user: any, token: string): Promise<any> {
    try {
      const response = await axios.post(
        `${this.API_URL}/add-responsable`,
        user,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  }

  async addAdmin(user: any, token: string): Promise<any> {
    try {
      const response = await axios.post(
        `${this.API_URL}/add-admin`,
        user,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  }

  // Ajouter un agent administratif
  async addAgent(user: any, token: string): Promise<any> {
    try {
      const response = await axios.post(
        `${this.API_URL}/add-agent`, // Endpoint pour ajouter un agent
        user,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Envoi du token pour authentification
          },
        }
      );
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  }

  async deleteUser(userId: string, token: string): Promise<any> {
    try {
      const response = await axios.delete(
        `${this.API_URL}/delete-user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  }
  // Récupérer la liste des agents
async getAgents(): Promise<any> {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${this.API_URL}/agents`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
}



}
