import { Component, OnInit } from '@angular/core'; 
import { ReclamationService } from '../services/reclamation.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-envoyer-reclamation',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './envoyer-reclamation.component.html',
  styleUrl: './envoyer-reclamation.component.scss'
})
export class EnvoyerReclamationComponent implements OnInit {
  titre = '';
  objectif = '';
  commune = '';
  fichier: File | null = null;
  communes: any[] = [];
  userEmail = '';

  constructor(private reclamationService: ReclamationService, private router: Router) {}

  ngOnInit() {
    this.reclamationService.getCommunes().then(
      (data: any[]) => {
        if (Array.isArray(data)) {
          this.communes = data;
        } else {
          console.error('Les communes ne sont pas un tableau:', data);
          this.communes = [];
        }
      },
      (error) => {
        console.error('Erreur lors du chargement des communes', error);
        this.communes = [];
      }
    );
  }

  onFileChange(event: any) {
    this.fichier = event.target.files[0];
  }

  async envoyer() {
    if (!this.fichier) {
      Swal.fire({
        icon: 'warning',
        title: 'Fichier manquant',
        text: 'Veuillez sélectionner un fichier.'
      });
      return;
    }

    const formData = new FormData();
    formData.append('titre', this.titre);
    formData.append('objectif', this.objectif);
    formData.append('commune', this.commune);
    formData.append('file', this.fichier);

    try {
      await this.reclamationService.envoyerReclamation(formData);

      Swal.fire({
        icon: 'success',
        title: 'Succès',
        text: 'Réclamation envoyée avec succès !'
      });

      this.titre = '';
      this.objectif = '';
      this.commune = '';
      this.fichier = null;
    } catch (err: any) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: err.message || 'Erreur lors de l’envoi de la réclamation.'
      });
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  EnvoyerReclamation() {
    this.router.navigate(['/EnvoyerReclamation']);
  }

  home() {
    this.router.navigate(['/citoyen']);
  }

  chatbot() {
    this.router.navigate(['/chatbot']);
  }
}
