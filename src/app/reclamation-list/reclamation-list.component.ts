import { Component } from '@angular/core';
import { ReclamationService } from '../services/reclamation.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-reclamation-list',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './reclamation-list.component.html',
  styleUrls: ['./reclamation-list.component.scss']
})
export class ReclamationListComponent {
  reclamations: any[] = [];
  filteredReclamations: any[] = [];
  
  communes: string[] = []; // Liste des communes disponibles
  selectedCommune: string = ''; // Commune choisie dans le filtre
  searchCommune: string = '';

  constructor(private reclamationService: ReclamationService, private router: Router) {}

  ngOnInit() {
    // Charger les réclamations
    this.reclamationService.getAllReclamations()
      .then(response => {
        this.reclamations = response.data;
        this.filteredReclamations = [...this.reclamations];
        this.extractCommunes();
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des réclamations:', error);
      });
  }

  // Extraire la liste unique des communes à partir des réclamations
  extractCommunes() {
    const communesSet = new Set<string>();
    this.reclamations.forEach(rec => {
      if (rec.commune) {
        communesSet.add(rec.commune);
      }
    });
    this.communes = Array.from(communesSet).sort();
  }

  filterByCommune() {
    if (!this.searchCommune || this.searchCommune.trim() === '') {
      this.filteredReclamations = [...this.reclamations];
    } else {
      const searchLower = this.searchCommune.toLowerCase().trim();
      this.filteredReclamations = this.reclamations.filter(rec =>
        rec.commune?.nom.toLowerCase().includes(searchLower)
      );
    }
  }
  
  exportToExcel() {
    const worksheetData = this.filteredReclamations.map(r => ({
      Titre: r.titre,
      Objectif: r.objectif,
      Commune: r.commune?.nom || '',
      Provenance: r.associationId
        ? 'Association: ' + r.associationId.email
        : 'Citoyen: ' + (r.citoyenId?.email || ''),
      "Date d'envoi": new Date(r.dateEnvoi).toLocaleString(),
      Statut: r.validationAgent,
      Fichier: r.fichierPath
    }));
  
    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Réclamations');
  
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'reclamations.xlsx');
  }
  exportToPDF() {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text('Liste des réclamations', 14, 15);
  
    const tableData = this.filteredReclamations.map(r => [
      r.titre,
      r.objectif,
      r.commune?.nom || '',
      r.associationId
        ? 'Association: ' + r.associationId.email
        : 'Citoyen: ' + (r.citoyenId?.email || ''),
      new Date(r.dateEnvoi).toLocaleString(),
      r.validationAgent,
      r.fichierPath
    ]);
  
    autoTable(doc, {
      head: [['Titre', 'Objectif', 'Commune', 'Provenance', 'Date', 'Statut', 'Fichier']],
      body: tableData,
      startY: 20,
      styles: { fontSize: 8, cellPadding: 2 },
      headStyles: { fillColor: [22, 160, 133] } // Couleur en-tête verte
    });
  
    doc.save('reclamations.pdf');
  }
    

  // Navigation et autres méthodes inchangées
  goToAddUser() {
    this.router.navigate(['/adduser']);
  }
  goToListUsers() {
    this.router.navigate(['/ListUsers']);
  }
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
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
  listreclamation(){
    this.router.navigate(['/listReclamation']);
  }
  assignation(){
    this.router.navigate(['/assignation']);
  }
  home(){
    this.router.navigate(['/admin']);
  }
  listassignation(){
    this.router.navigate(['/listassignation']);
  }
}
