import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-modal-association',
  templateUrl: './modal-association.component.html',
  styleUrls: ['./modal-association.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule,// Ajouter MatCardModule
    MatButtonModule,  // Ajouter MatButtonModule
    MatIconModule ],
})
export class ModalAssociationComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { membres: any[], dossierJuridique: string },
    public dialogRef: MatDialogRef<ModalAssociationComponent>
  ) {}

  fermer() {
    this.dialogRef.close();
  }
}
