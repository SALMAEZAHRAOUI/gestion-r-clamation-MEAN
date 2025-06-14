import { Component, OnInit } from '@angular/core';
import { ReclamationService } from '../services/reclamation.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-liste-reclamation-association',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './liste-reclamation-association.component.html',
  styleUrls: ['./liste-reclamation-association.component.scss']
})
export class ListeReclamationAssociationComponent implements OnInit {
  reclamations: any[] = [];

  constructor(private reclamationService: ReclamationService,private router: Router) {}

  ngOnInit(): void {
    this.reclamationService.getReclamationsByAssociation()
      .then(res => {
        this.reclamations = res.data.data;
      })
      .catch(err => {
        console.error('Erreur lors du chargement des réclamations', err);
      });
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
