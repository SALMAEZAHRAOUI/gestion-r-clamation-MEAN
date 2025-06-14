// gemini.service.ts
import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class GeminiService {

  private apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDI1jzuI5M0v0FGbSFXuy1hBs7c8ZKka-g'; // Remplace avec l'URL réelle

  constructor() { }

  async getRequiredDocuments(province: string): Promise<any> {
    try {
      const response = await axios.get(`${this.apiUrl}documents/${province}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des documents :', error);
      throw error;
    }
  }
}
