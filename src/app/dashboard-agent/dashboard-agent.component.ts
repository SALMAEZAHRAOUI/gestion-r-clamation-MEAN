import { Component, OnInit } from '@angular/core';
import { ReclamationService } from '../services/reclamation.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ChartData, ChartOptions } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import html2canvas from 'html2canvas';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard-agent',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatButtonModule, MatIconModule, NgChartsModule],
  templateUrl: './dashboard-agent.component.html',
  styleUrls: ['./dashboard-agent.component.scss']
})
export class DashboardAgentComponent implements OnInit {
  chartByTypeData: ChartData<'bar'> = {
    labels: [],
    datasets: [{
      label: 'Statut des réclamations',
      data: [],
      backgroundColor: ['#4CAF50', '#F44336', '#FFC107']
    }]
  };

  chartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Statut des réclamations'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Nombre de réclamations'
        }
      }
    }
  };

  constructor(
    private reclamationService: ReclamationService,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: any = this.authService.decodeToken(token);
      const agentId = decoded.id;

      if (agentId) {
        this.getReclamationsStatsByAgent(agentId);
      }
    }
  }

  getReclamationsStatsByAgent(agentId: string): void {
    this.reclamationService.getReclamationsByAgent(agentId)
      .then((data) => {
        const stats = {
          acceptée: 0,
          refusée: 0,
          'non défini': 0
        };

        for (const r of data) {
          const status: 'acceptée' | 'refusée' | 'non défini' = r.validationAgent || 'non défini';
          stats[status] = (stats[status] || 0) + 1;
        }

        this.chartByTypeData = {
          labels: ['acceptée', 'refusée', 'non défini'],
          datasets: [{
            label: 'Statut des réclamations',
            data: [stats['acceptée'], stats['refusée'], stats['non défini']],
            backgroundColor: ['#4CAF50', '#F44336', '#FFC107']
          }]
        };
      })
      .catch((err) => {
        console.error('Erreur lors de la récupération des réclamations de l’agent', err);
      });
  }

  listreclamation() {
    this.router.navigate(['/reclamationsagent']);
  }

  home() {
    this.router.navigate(['/agent']);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
