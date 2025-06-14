import { Component } from '@angular/core';
import { ExcelService } from '../services/excel.service';
import { AssociationService } from '../services/association.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-association',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register-association.component.html',
  styleUrls: ['./register-association.component.scss']
})
export class RegisterAssociationComponent {
  nom = '';
  email = '';
  password = '';
  dossierFile!: File;
  excelFile!: File;
  errorMessage = '';

  constructor(
    private excelService: ExcelService,
    private associationService: AssociationService,
    private router: Router
  ) {}

  downloadExcelTemplate() {
    this.excelService.generateEmptyMembreTemplate();
  }

  onExcelSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.excelFile = file;
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.dossierFile = file;
    }
  }

  async onRegister() {
    this.errorMessage = '';
    if (!this.nom || !this.email || !this.password || !this.dossierFile || !this.excelFile) {
      this.errorMessage = 'Veuillez remplir tous les champs et sélectionner les fichiers.';
      Swal.fire({
        icon: 'warning',
        title: 'Champs manquants',
        text: this.errorMessage
      });
      return;
    }

    const confirmation = await Swal.fire({
      title: 'Confirmation',
      text: 'Voulez-vous vraiment enregistrer cette association ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Oui, enregistrer',
      cancelButtonText: 'Annuler'
    });

    if (!confirmation.isConfirmed) {
      return;
    }

    try {
      await this.associationService.enregistrerAssociation(
        this.nom,
        this.email,
        this.password,
        this.dossierFile,
        this.excelFile
      );

      await Swal.fire({
        icon: 'success',
        title: 'Succès',
        text: 'Association enregistrée avec succès',
        confirmButtonText: 'OK'
      });

      this.router.navigate(['/login']);

    } catch (err: any) {
      this.errorMessage = err?.message || 'Erreur d’enregistrement';
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: this.errorMessage
      });
    }
  }
}
