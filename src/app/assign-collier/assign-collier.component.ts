import { Component } from '@angular/core';
import { CourrierService } from '../services/CourrierService ';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import axios from 'axios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assign-collier',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './assign-collier.component.html',
  styleUrls: ['./assign-collier.component.scss']
})
export class AssignCollierComponent {
  courriers: any[] = [];
  users: any[] = [];
  selectedCourrierId = '';
  selectedResponsableId = '';

  constructor(private courrierService: CourrierService ,private router: Router) {}

  async ngOnInit() {
    try {
      const [courrierRes, userRes] = await Promise.all([
        this.courrierService.getAllCourriers(),
        axios.get('http://localhost:5000/api/auth/list-users', this.courrierService['getAuthHeaders']())
      ]);

      this.courriers = courrierRes.data;
      this.users = userRes.data.filter((u: any) => u.role?.toLowerCase() === 'responsable');
    } catch (error) {
      console.error('Erreur lors du chargement :', error);
    }
  }

  async affecter() {
    if (!this.selectedCourrierId || !this.selectedResponsableId) {
      alert("Veuillez sélectionner un courrier et un responsable.");
      return;
    }

    try {
      await axios.put(
        `http://localhost:5000/api/courriers/${this.selectedCourrierId}/affecter`,
        { responsableId: this.selectedResponsableId },
        this.courrierService['getAuthHeaders']()
      );

      alert('✅ Responsable affecté avec succès !');
      this.selectedCourrierId = '';
      this.selectedResponsableId = '';
    } catch (err) {
      console.error(err);
      alert('❌ Erreur lors de l’affectation');
    }
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
