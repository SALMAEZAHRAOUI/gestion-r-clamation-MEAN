import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ChartData, ChartOptions } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ReclamationService } from '../services/reclamation.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    NgChartsModule
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {
  userRole = '';
  userName = '';
  userEmail = '';
  @ViewChild('dashboard') dashboardElement!: ElementRef;

  chartByTypeData: ChartData<'bar'> = { labels: [], datasets: [] };
  chartByDateData: ChartData<'line'> = { labels: [], datasets: [] };

  chartOptions: ChartOptions = { responsive: true };

  constructor(private reclamationService: ReclamationService ,private authService: AuthService, private router: Router) {}


  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: any = this.authService.decodeToken(token);
      this.userRole = decoded.role;
      this.userName = decoded.name || decoded.username || 'Admin';
      this.userEmail = decoded.email || '';
    }
    this.loadStats();
  }

  async loadStats() {
    const byType = await this.reclamationService.getStatsByType();
    const byDate = await this.reclamationService.getStatsByDate();

    this.chartByTypeData = {
      labels: byType.map(item => item._id),
      datasets: [{
        label: 'Réclamations par type',
        data: byType.map(item => item.count),
        backgroundColor: '#42A5F5'
      }]
    };

    this.chartByDateData = {
      labels: byDate.map(item => item._id),
      datasets: [{
        label: 'Réclamations par date',
        data: byDate.map(item => item.count),
        borderColor: '#66BB6A',
        fill: false
      }]
    };
  }

  exportToPDF() {
    const dashboard = this.dashboardElement.nativeElement;
  
    // Corriger les couleurs non supportées
    dashboard.querySelectorAll('*').forEach((el: any) => {
      const computedStyle = getComputedStyle(el);
      // Corrige la couleur du texte
      if (computedStyle.color.startsWith('color(')) {
        el.style.color = '#000'; // ou autre couleur par défaut
      }
      // Corrige la couleur de fond si nécessaire
      if (computedStyle.backgroundColor.startsWith('color(')) {
        el.style.backgroundColor = '#fff'; // ou autre valeur selon ton thème
      }
    });
  
    html2canvas(dashboard, { useCORS: true }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('dashboard.pdf');
    }).catch(error => {
      console.error('Erreur lors de la génération du PDF :', error);
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
    this.router.navigate(['/admin']);
  }
  
  listassignation(){
    this.router.navigate(['/listassignation']);//listassignation
  }
}
