import { Component, OnInit } from '@angular/core';
import { ReclamationService } from '../services/reclamation.service';
import { AuthService } from '../services/auth.service'; // Service contenant getAgents()
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-assignation-reclamation',
  standalone: true,
imports: [CommonModule, FormsModule, MatCardModule],// Ajouter MatCardModule

  templateUrl: './assignation-reclamation.component.html',
  styleUrl: './assignation-reclamation.component.scss'
})
export class AssignationReclamationComponent implements OnInit {
  reclamations: any[] = [];
  agents: any[] = [];
  selectedAgents: { [key: string]: string } = {}; // idReclamation => idAgent sélectionné

  constructor(
    private reclamationService: ReclamationService,
    private authService: AuthService,
    private router: Router

  ) {}

  ngOnInit(): void {
    this.loadReclamations();
    this.loadAgents();
    
  }

  loadReclamations() {
    this.reclamationService.getAllReclamations()
      .then(res => {
        // Ne garder que les réclamations sans agent assigné
        this.reclamations = res.data.filter((reclamation: any) => !reclamation.agentId);
        console.log('Réclamations non assignées :', this.reclamations);
      })
      .catch(err => console.error('Erreur chargement réclamations', err));
  }
  
  loadAgents() {
    this.authService.getAgents()
      .then(res => {
        this.agents = res;
        console.log(this.agents); // vérifie ici si tu vois des nom/prenom
      })
      .catch(err => console.error('Erreur chargement agents', err));
  }
  

  assignerAgent(idReclamation: string) {
    const agentId = this.selectedAgents[idReclamation];
    if (!agentId) {
      Swal.fire('Erreur', 'Veuillez sélectionner un agent', 'warning');
      return;
    }

    this.reclamationService.assignerAgent(idReclamation, agentId)
      .then(() => {
        Swal.fire('Succès', 'Agent assigné avec succès', 'success');
        this.loadReclamations();
      })
      .catch(() => {
        Swal.fire('Erreur', "Échec d'assignation", 'error');
      });
  }
  goToAddUser() {
    this.router.navigate(['/adduser']);
  }
  goToListUsers() {
    this.router.navigate(['/ListUsers']);
  }
  logout() {
    localStorage.removeItem('token'); // 👈 Supprimer le token
    this.router.navigate(['/login']); // 👈 Rediriger vers la page de login
  }//ListUsers
 
  goToListcollier() {
    this.router.navigate(['/Listcollier']);
  }
  goToassigncollier() {
    this.router.navigate(['/assigncollier']);
  }
  goToaddcollier() {
    this.router.navigate(['/addcollier']);
  }
  listreclamation(){
    this.router.navigate(['/listReclamation']);//
  }

  assignation(){
    this.router.navigate(['/assignation']);//assignation
  }
  home(){
    this.router.navigate(['/admin']);//assignation
  }
  listassignation(){
    this.router.navigate(['/listassignation']);//listassignation
  }
}


