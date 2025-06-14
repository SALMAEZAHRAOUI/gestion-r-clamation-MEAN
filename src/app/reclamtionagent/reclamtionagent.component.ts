import { Component } from '@angular/core';
import { ReclamationService } from '../services/reclamation.service';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reclamtionagent',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reclamtionagent.component.html',
  styleUrl: './reclamtionagent.component.scss'
})
export class ReclamtionagentComponent {

  modalOuvert = false;
reclamationSelectionnee: any = null;
  reclamations: any[] = [];
  
    constructor(private reclamationService: ReclamationService ,private authService: AuthService, private router: Router,  private dialog: MatDialog) {}
  
    ngOnInit(): void {
      this.chargerReclamations();
    }
  
    chargerReclamations() {
      this.reclamationService.getMyAssignedReclamations()
        .then((response) => {
          this.reclamations = response.data;
          console.log(this.reclamations)
        })
        .catch((error) => {
          console.error('Erreur chargement des réclamations assignées', error);
        });
    }
  
    validerReclamation(id: string) {
      // Validation sans motif, car c'est juste une validation
      this.reclamationService.validateReclamation(id, { validationAgent: 'acceptée', motifRefus:  'validé' })
        .then(() => {
          Swal.fire('Succès', 'Réclamation validée', 'success');
          this.chargerReclamations();
        })
        .catch(() => {
          Swal.fire('Erreur', 'Échec validation', 'error');
        });
    }
  
    refuserReclamation(id: string) {
      // Demande le motif de refus
      Swal.fire({
        title: 'Cause du refus',
        input: 'text',
        inputPlaceholder: 'Indiquez la raison du refus',
        showCancelButton: true,
        confirmButtonText: 'Refuser',
        cancelButtonText: 'Annuler'
      }).then((result) => {
        if (result.isConfirmed && result.value) {
          // Envoie la requête de refus avec le motif
          this.reclamationService.validateReclamation(id, { validationAgent: 'refusée', motifRefus: result.value ?? 'Motif non spécifié' })
            .then(() => {
              Swal.fire('Réclamation refusée', '', 'success');
              this.chargerReclamations();
            })
            .catch(() => {
              Swal.fire('Erreur', 'Impossible de refuser', 'error');
            });
        }
      });
    }

   
    
    listreclamation() {
      this.router.navigate(['/reclamationsagent']);
    }
  home (){
    this.router.navigate(['/agent']);
  }
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);//reclamationsAgent
  }
}
