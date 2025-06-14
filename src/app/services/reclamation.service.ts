import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class ReclamationService {
  private API_URL = 'http://localhost:5000/api/reclamations';
  private ASSOCIATION_API_URL = 'http://localhost:5000/api/reclamations/association'; // ➡️ ajout

  constructor() {}

  getCommunes() {
    return axios.get(`http://localhost:5000/api/communes`)
      .then(response => response.data)
      .catch(error => {
        console.error('Erreur lors du chargement des communes', error);
        throw error;
      });
  }

  envoyerReclamation(formData: FormData) {
    const token = localStorage.getItem('token');
    return axios.post(this.API_URL, formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  /*📦 Envoyer une réclamation d'une association
   */
  envoyerReclamationAssociation(formData: FormData) {
    const token = localStorage.getItem('token');
    return axios.post(this.ASSOCIATION_API_URL, formData, {
      headers: {
        Authorization: `Bearer ${token}`
        // Axios va automatiquement ajouter Content-Type: multipart/form-data
      }
    });
  }

  getReclamationsByCitoyen(citoyenId: string) {
    return axios.get(`http://localhost:5000/api/reclamations/citoyen/${citoyenId}`);
  }

  getAllReclamations() {
    return axios.get('http://localhost:5000/api/reclamations/');
  }

  assignReclamation(reclamationId: string, agentId: string) {
    const token = localStorage.getItem('token');
    return axios.put(`http://localhost:5000/api/reclamations/${reclamationId}/assign`, { agentId }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  validateReclamation(reclamationId: string, data: { validationAgent: string, motifRefus?: string }) {
    const token = localStorage.getItem('token');
    return axios.put(`http://localhost:5000/api/reclamations/${reclamationId}/valider`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
  }

  getMyAssignedReclamations() {
    const token = localStorage.getItem('token');
    return axios.get(`${this.API_URL}/mes-reclamations`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  assignerAgent(reclamationId: string, agentId: string): Promise<any> {
    const token = localStorage.getItem('token');
    return axios.put(
      `http://localhost:5000/api/reclamations/${reclamationId}/assign`,
      { agentId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  async getStatsByType(): Promise<any[]> {
    const response = await axios.get('http://localhost:5000/api/reclamations/stats/by-type');
    return response.data;
  }

  async getStatsByDate(): Promise<any[]> {
    const response = await axios.get(`http://localhost:5000/api/reclamations/stats/by-date`);
    return response.data;
  }

  getReclamationsByAssociation() {
    const token = localStorage.getItem('token');
    return axios.get('http://localhost:5000/api/reclamations/association', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  

  
  // Nouvelle méthode pour récupérer les réclamations par statut de validation
  getReclamationsByValidation(validationAgent: string) {
    const token = localStorage.getItem('token');
    return axios.get(`${this.API_URL}/reclamations-par-statut`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        validationAgent // envoie le paramètre validationAgent dans la requête
      }
    });
  }


  getReclamationsByAgent(agentId: string): Promise<any> {
    return axios
      .get(`http://localhost:5000/api/reclamations/agent/${agentId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(res => res.data);
  }
}
