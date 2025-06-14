import { Component, OnInit } from '@angular/core';
import { CourrierService } from '../services/CourrierService ';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog'; 
import { EditCourrierModalComponent } from '../edit-courrier-modal/edit-courrier-modal.component';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as FileSaver from 'file-saver';


@Component({
  selector: 'app-list-colliers',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe, MatTableModule,MatButtonModule,MatFormFieldModule], // Ajout du DatePipe pour le formatage de la date
  templateUrl: './list-colliers.component.html',
  styleUrls: ['./list-colliers.component.scss']
})
export class ListColliersComponent implements OnInit {
  courriers: any[] = [];
  filteredCourriers: any[] = [];
  searchSubject: string = ''; // Variable de filtre par sujet

  constructor(private courrierService: CourrierService, private router: Router, public dialog: MatDialog) {}

  async ngOnInit() {
    try {
      const response = await this.courrierService.getAllCourriers();
      this.courriers = response.data;
      this.filteredCourriers = [...this.courriers]; // Initialisation avec tous les courriers
    } catch (error) {
      console.error('Erreur lors du chargement des courriers', error);
    }
  }

  // Fonction de filtrage des courriers par sujet
  filterCourriers() {
    this.filteredCourriers = this.courriers.filter(courrier =>
      courrier.sujet.toLowerCase().includes(this.searchSubject.toLowerCase())
    );
  }

  // Ouvre la modale de modification du courrier
  openEditModal(courrier: any): void {
    const dialogRef = this.dialog.open(EditCourrierModalComponent, {
      width: '500px',
      data: { courrier }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Rafraîchir les courriers après la modification
        this.ngOnInit();
      }
    });
  }



// Exporter en fichier PDF
exportToPDF(): void {
  const doc = new jsPDF();
  doc.text('Liste des courriers', 14, 10);

  const tableData = this.filteredCourriers.map(courrier => {
    const responsable = courrier.responsable?.nom || 'Non affecté';

    const historiqueStr = (courrier.historique || [])
      .map((entry: any) => {
        const date = new Date(entry.date).toISOString().split('T')[0]; // format YYYY-MM-DD
        return `${entry.type} par ${entry.organisation} (Réf: ${entry.numeroReference}, le ${date})`;
      })
      .join(' | ');

    return [courrier.sujet, historiqueStr || 'N/A', responsable];
  });

  autoTable(doc, {
    head: [['Sujet', 'Historique', 'Responsable']],
    body: tableData,
    startY: 20
  });

  doc.save('courriers.pdf');
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
