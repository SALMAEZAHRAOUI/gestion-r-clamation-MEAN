import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AssociationService {
  private baseUrl = 'http://localhost:5000/api/association';

  constructor() {}

  async enregistrerAssociation(
    nom: string,
    email: string,
    password: string,
    dossierJuridique: File,
    membresExcel: File
  ): Promise<any> {
    const formData = new FormData();
    formData.append('nom', nom);
    formData.append('email', email);
    formData.append('password', password);

    if (dossierJuridique) {
      formData.append('dossierJuridique', dossierJuridique);
    }

    if (membresExcel) {
      formData.append('membresExcel', membresExcel);
    }

    try {
      const response = await axios.post(`${this.baseUrl}/public/enregistrer`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { message: 'Erreur serveur' };
    }
  }
}
