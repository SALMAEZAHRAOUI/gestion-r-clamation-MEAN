import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ListusersService {
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

  // Récupérer la liste des administrateurs et responsables
  async getUsers(token: string): Promise<any> {
    try {
      const response = await axios.get(`${this.API_URL}/list-users`, {
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
