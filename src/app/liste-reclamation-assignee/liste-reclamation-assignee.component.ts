import { Component, OnInit } from '@angular/core';
import { ReclamationService } from '../services/reclamation.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';                                                                                                               
@Component({
  selector: 'app-liste-reclamation-assignee',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './liste-reclamation-assignee.component.html',
  styleUrls: ['./liste-reclamation-assignee.component.scss']
})
export class ListeReclamationAssigneeComponent implements OnInit {
  reclamationsAssignees: any[] = [];
  constructor(private reclamationService: ReclamationService ,private authService: AuthService, private router: Router) {}



  ngOnInit(): void {
    this.loadReclamationsAssignees();
  }

  loadReclamationsAssignees() {
    this.reclamationService.getAllReclamations()
      .then(res => {
        // Filtrer les réclamations qui ont un agent assigné
        this.reclamationsAssignees = res.data.filter((reclamation: any) => reclamation.agentId
        );
       
      })
      .catch(err => console.error('Erreur chargement des réclamations assignées', err));
  }


  exportToExcel(): void {
    const dataToExport = this.reclamationsAssignees.map((r: any) => ({
      Titre: r.titre,
      Objectif: r.objectif,
      Commune: r.commune?.nom,
      'Agent Assigné': r.agentId?.email,
      'Email de Provenance': r.associationId?.email || r.citoyenId?.email || '',
    }));

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook: XLSX.WorkBook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    FileSaver.saveAs(blob, 'reclamations-assignées.xlsx');
  }

  exportToPDF(): void {
    const doc = new jsPDF();
    doc.text('Réclamations Assignées', 14, 10);

    const tableData = this.reclamationsAssignees.map((r: any, index: number) => [
      index + 1,
      r.titre,
      r.commune?.nom,
      r.objectif,
      r.agentId?.email || '',
      r.associationId?.email || r.citoyenId?.email || '',
    ]);

    autoTable(doc, {
      head: [['#', 'Titre', 'Commune', 'Objectif', 'Agent Assigné', 'Email de Provenance']],
      body: tableData,
      startY: 20,
    });

    doc.save('reclamations-assignées.pdf');
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
    this.router.navigate(['/admin']);
  }
  
  listassignation(){
    this.router.navigate(['/listassignation']);//listassignation
  }
}
