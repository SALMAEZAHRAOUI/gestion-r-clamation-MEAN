import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent {
  username = '';
  email = '';
  password = '';
  role = '';
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  async onAddUser() {
    const token = localStorage.getItem('token');

    if (!token) {
      Swal.fire({
        icon: 'error',
        title: 'Non autorisé',
        text: 'Vous devez être connecté en tant qu\'admin.',
      });
      return;
    }

    const newUser = {
      username: this.username,
      email: this.email,
      password: this.password,
      role: this.role
    };

    try {
      if (this.role === 'admin') {
        await this.authService.addAdmin(newUser, token);
      } else if (this.role === 'agent') {
        await this.authService.addAgent(newUser, token);
      }

      Swal.fire({
        icon: 'success',
        title: 'Succès',
        text: `${this.role.charAt(0).toUpperCase() + this.role.slice(1)} ajouté avec succès !`,
      });

      this.username = '';
      this.email = '';
      this.password = '';
      this.role = 'agent';
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: error.message || 'Erreur lors de l\'ajout de l\'utilisateur',
      });
    }
  }

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
  listreclamation() {
    this.router.navigate(['/listReclamation']);
  }
  assignation() {
    this.router.navigate(['/assignation']);
  }
  home() {
    this.router.navigate(['/admin']);
  }
  listassignation() {
    this.router.navigate(['/listassignation']);
  }
}
