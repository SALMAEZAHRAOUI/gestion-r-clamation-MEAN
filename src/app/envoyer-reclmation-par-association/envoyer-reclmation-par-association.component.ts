import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReclamationService } from '../services/reclamation.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-envoyer-reclmation-par-association',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './envoyer-reclmation-par-association.component.html',
  styleUrls: ['./envoyer-reclmation-par-association.component.scss']
})
export class EnvoyerReclmationParAssociationComponent implements OnInit {
  titre: string = '';
  objectif: string = '';
  commune: string = '';
  fichier: File | null = null; // fichier principal (PDF/Word)
  fichierMembres: File | null = null; // fichier membres (Excel)
  communesList: any[] = [];
  envoiEnCours: boolean = false;

  constructor(
    private reclamationService: ReclamationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.reclamationService.getCommunes()
      .then(data => {
        this.communesList = data;
      })
      .catch(error => {
        console.error('Erreur chargement communes', error);
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Impossible de charger la liste des communes.'
        });
      });
  }

  onFileSelected(event: any) {
    this.fichier = event.target.files[0];
  }

  onFichierMembresSelected(event: any) {
    this.fichierMembres = event.target.files[0];
  }

  envoyerReclamation() {
    if (!this.titre || !this.objectif || !this.commune || !this.fichier || !this.fichierMembres) {
      Swal.fire({
        icon: 'warning',
        title: 'Champs manquants',
        text: 'Merci de remplir tous les champs et de choisir les deux fichiers.'
      });
      return;
    }

    const formData = new FormData();
    formData.append('titre', this.titre);
    formData.append('objectif', this.objectif);
    formData.append('commune', this.commune);
    formData.append('fichier', this.fichier);
    formData.append('fichierMembres', this.fichierMembres);

    this.envoiEnCours = true;

    Swal.fire({
      title: 'Envoi en cours...',
      text: 'Merci de patienter',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    this.reclamationService.envoyerReclamationAssociation(formData)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Succès ✅',
          text: 'Réclamation envoyée avec succès.'
        });

        // Réinitialisation des champs
        this.titre = '';
        this.objectif = '';
        this.commune = '';
        this.fichier = null;
        this.fichierMembres = null;
      })
      .catch(error => {
        console.error('Erreur envoi réclamation', error);
        Swal.fire({
          icon: 'error',
          title: 'Erreur ❌',
          text: error?.message || 'Erreur lors de l\'envoi de la réclamation.'
        });
      })
      .finally(() => {
        this.envoiEnCours = false;
      });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  envoyer(): void {
    this.router.navigate(['/envoyerrecassociation']);
  }

  home() {
    this.router.navigate(['/association']);
  }

  chatbot() {
    this.router.navigate(['/chatbot']);
  }
}
