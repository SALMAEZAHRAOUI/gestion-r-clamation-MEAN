import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CourrierService } from '../services/CourrierService '; // Attention : pas d’espace à la fin
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-responsable-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './responsable-dashboard.component.html',
  styleUrls: ['./responsable-dashboard.component.scss']
})
export class ResponsableDashboardComponent implements OnInit {
  userName = '';
  courriers: any[] = [];
  isLoading = true;

  constructor(
    private authService: AuthService,
    private courrierService: CourrierService,
    private router: Router
  ) {}

  async ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: any = this.authService.decodeToken(token);
      this.userName = decoded.name || decoded.username;

      try {
        const response = await this.courrierService.getMyCourriers();
        this.courriers = response.data;
        console.log('Courriers reçus :', this.courriers);
      } catch (error) {
        console.error('Erreur lors du chargement des courriers', error);
      } finally {
        this.isLoading = false;
      }
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
