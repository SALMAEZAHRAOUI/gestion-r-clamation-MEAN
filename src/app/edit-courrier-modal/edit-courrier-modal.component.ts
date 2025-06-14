import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CourrierService } from '../services/CourrierService ';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-edit-courrier-modal',
  imports: [CommonModule, FormsModule,  MatTableModule,MatButtonModule,MatFormFieldModule], // Ajout du DatePipe pour le formatage de la date
  templateUrl: './edit-courrier-modal.component.html',
  styleUrls: ['./edit-courrier-modal.component.scss']
})
export class EditCourrierModalComponent {
  courrier: any;

  constructor(
    public dialogRef: MatDialogRef<EditCourrierModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private courrierService: CourrierService
  ) {
    this.courrier = { ...data.courrier };  // Initialisation avec les données du courrier
  }

  // Méthode pour modifier le courrier
  async updateCourrier() {
    try {
      await this.courrierService.updateCourrier(this.courrier._id, this.courrier);
      this.dialogRef.close(true);  // Ferme la modale et informe que le courrier a été modifié
    } catch (error) {
      console.error('Erreur lors de la mise à jour du courrier:', error);
    }
  }

  // Ferme la modale sans enregistrer les modifications
  close(): void {
    this.dialogRef.close();
  }
}
