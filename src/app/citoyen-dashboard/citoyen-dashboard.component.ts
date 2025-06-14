import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReclamationService } from '../services/reclamation.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import axios from 'axios';

@Component({
  selector: 'app-citoyen-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './citoyen-dashboard.component.html',
  styleUrl: './citoyen-dashboard.component.scss'
})
export class CitoyenDashboardComponent implements OnInit {
  userRole = '';
  userName = '';
  userEmail = '';
  citoyenId = '';
  reclamations: any[] = [];
  message: string | undefined;

  constructor(
    private authService: AuthService,
    private router: Router,
    private reclamationService: ReclamationService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
  
    if (token) {
      const decoded: any = this.authService.decodeToken(token);
      console.log('Token décodé :', decoded); // Debug: Vérifie le contenu du token
  
      this.userRole = decoded.role || '';
      this.userName = decoded.name || decoded.username || 'Citoyen';
      this.userEmail = decoded.email || '';
      this.citoyenId = decoded.id || '';  // Utilise decoded.id ici, pas decoded._id ou decoded.userId
  
      if (!this.citoyenId) {
        console.error('❌ Aucun ID de citoyen trouvé dans le token');
        return;
      }
  
      this.reclamationService.getReclamationsByCitoyen(this.citoyenId)
        .then(response => {
          this.reclamations = response.data || [];
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des réclamations:', error);
          this.reclamations = [];
        });
    } else {
      console.warn('Token non trouvé dans le localStorage');
    }
  }
  supprimerReclamation(id: string) {
    const confirmation = confirm('Voulez-vous vraiment supprimer cette réclamation ?');

    if (confirmation) {
      axios
        .delete(`http://localhost:5000/api/reclamations/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then(() => {
          this.reclamations = this.reclamations.filter(r => r._id !== id);
          this.snackBar.open('Réclamation supprimée avec succès', 'Fermer', {
            duration: 3000
          });
        })
        .catch((err) => {
          console.error('Erreur lors de la suppression :', err);
          this.snackBar.open('Erreur lors de la suppression', 'Fermer', {
            duration: 3000
          });
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
  chatbot(){
    this.router.navigate(['/chatbot']);
  }
    // Sinon appel serveur
    //axios.post('http://localhost:5000/api/chatbot', { message })
     // .then((response) => {
       // const reply = response.data?.response || 'Pas de réponse.';
       // this.messages.push({ text: reply, sender: 'bot' });
     // })
     // .catch(() => {
      //  this.messages.push({ text: 'Erreur serveur.', sender: 'bot' });
     // });
}
