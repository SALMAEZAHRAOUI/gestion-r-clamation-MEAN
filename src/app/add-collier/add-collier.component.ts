import { Component } from '@angular/core';
import { CourrierService } from '../services/CourrierService ';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-collier',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-collier.component.html',
  styleUrls: ['./add-collier.component.scss']
})
export class AddCollierComponent {
  sujet = '';
  historique: any[] = [];
  userRole = '';
  userName = '';
  userEmail = '';
  organisation = '';
  type = 'expédition'; // 'expédition' ou 'réception' pour correspondre à l'enum côté backend
  numeroReference = '';
  date = '';

  constructor(private courrierService: CourrierService,private router: Router) {}

  ajouterEtape() {
    if (!this.organisation || !this.numeroReference || !this.date) {
      alert("Veuillez remplir tous les champs de l'étape.");
      return;
    }

    this.historique.push({
      organisation: this.organisation,
      type: this.type,
      numeroReference: this.numeroReference,
      date: this.date
    });

    // Réinitialiser les champs de l'étape
    this.organisation = '';
    this.type = 'expédition';
    this.numeroReference = '';
    this.date = '';
  }

  async enregistrer() {
    if (!this.sujet || this.historique.length === 0) {
      alert("Le sujet et au moins une étape sont obligatoires.");
      return;
    }

    const data = {
      sujet: this.sujet,
      historique: this.historique
    };

    try {
      const response = await this.courrierService.createCourrier(data);
      alert('📩 Courrier ajouté avec succès !');
      this.sujet = '';
      this.historique = [];
    } catch (error) {
      alert('❌ Erreur lors de l\'ajout du courrier.');
      console.error(error);
    }
  }
  goToAddUser() {
    this.router.navigate(['/adduser']);
  }
  logout() {
    localStorage.removeItem('token'); // 👈 Supprimer le token
    this.router.navigate(['/login']); // 👈 Rediriger vers la page de login
  }//ListUsers
  goToListUsers() {
    this.router.navigate(['/ListUsers']);
  }
  goToListcollier() {
    this.router.navigate(['/Listcollier']);
  }
  goToassigncollier() {
    this.router.navigate(['/assigncollier']);
  }
  goToaddcollier() {
    this.router.navigate(['/addcollier']);
  }
}
