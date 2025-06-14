import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-association',
  imports: [CommonModule, FormsModule],
  templateUrl: './association.component.html',
  styleUrls: ['./association.component.scss']
})
export class AssociationComponent implements OnInit {
  membres: any[] = []; // Tableau pour stocker les membres
  errorMessage: string = ''; // Message d'erreur si l'API échoue
  associationEmail: string = ''; // Email de l'association à récupérer (à définir selon le contexte)

  constructor(
    private authService: AuthService, // Service d'authentification
    private router: Router // Router pour la navigation
  ) {}

  ngOnInit(): void {
    this.getAssociationMembers(); // Appeler la méthode pour récupérer les membres
  }

  // Récupérer les membres de l'association à partir de l'email
  async getAssociationMembers(): Promise<void> {
    const token = localStorage.getItem('token'); // Récupérer le token JWT pour l'authentification

    if (!token) {
      this.router.navigate(['/login']); // Rediriger si l'utilisateur n'est pas connecté
      return;
    }

    // Décoder le token pour extraire l'email ou l'ID de l'utilisateur, ici on suppose que l'email est dans le token
    const decoded: any = this.authService.decodeToken(token);
    const userEmail = decoded.email;

    // Requête GET pour récupérer les membres de l'association
    try {
      const response = await axios.get(`http://localhost:5000/api/association/${userEmail}/membres`, {
        headers: {
          Authorization: `Bearer ${token}` // Ajouter le token dans les headers pour l'authentification
        }
      });

      this.membres = response.data; // Stocker les membres dans le tableau
    } catch (error) {
      const err = error as any;
      this.errorMessage = err.response?.data?.message || 'Erreur lors du chargement des membres.';
    }
  }

  // Déconnexion
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }//
  envoyer(): void {
    this.router.navigate(['/envoyerrecassociation']);
  }
  home() {
    this.router.navigate(['/association']);//
  }
  chatbot(){
    this.router.navigate(['/chatbot']);
  }
  mesreclmation (){
    this.router.navigate(['/mes-reclamations-association']);

  }
}
