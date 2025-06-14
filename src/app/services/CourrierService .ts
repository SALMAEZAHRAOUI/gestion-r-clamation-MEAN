import axios from 'axios';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourrierService {
  private apiUrl = 'http://localhost:5000/api/courriers'; // Modifie si besoin

  constructor() {}

  // 🔐 Ajoute le token d'auth dans l'entête
  private getAuthHeaders() {
    const token = localStorage.getItem('token'); // ou sessionStorage
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  }

  // ➕ Créer un nouveau courrier
  async createCourrier(courrierData: any) {
    return await axios.post(this.apiUrl, courrierData, this.getAuthHeaders());
  }

  // 📥 Récupérer tous les courriers (admin)
  async getAllCourriers() {
    return await axios.get(this.apiUrl, this.getAuthHeaders());
  }

  // 📥 Récupérer les courriers du responsable connecté
  getMyCourriers(): Promise<any> {
    return axios.get(`${this.apiUrl}/my`, this.getAuthHeaders());
  }

  // ➕ Ajouter une étape à l’historique
  async addHistorique(courrierId: string, historiqueData: any) {
    return await axios.put(`${this.apiUrl}/${courrierId}/historique`, historiqueData, this.getAuthHeaders());
  }
  // ✅ Affecter un responsable à un courrier (admin uniquement)
async affecterResponsable(courrierId: string, responsableId: string) {
  const data = { responsableId };
  return await axios.put(`${this.apiUrl}/${courrierId}/affecter`, data, this.getAuthHeaders());
}

 // ✏️ Modifier un courrier
 async updateCourrier(courrierId: string, courrierData: any) {
  return await axios.put(`${this.apiUrl}/${courrierId}`, courrierData, this.getAuthHeaders());
}

}
