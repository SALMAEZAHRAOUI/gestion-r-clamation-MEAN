import { Component } from '@angular/core';
import Swal from 'sweetalert2';  // <-- Import de SweetAlert2
import { ListusersService } from '../services/listusers.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule
  ],
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent {
  users: any[] = [];
  filteredUsers: any[] = [];
  searchQuery: string = '';
  token: string = '';

  displayedColumns: string[] = ['username', 'email', 'role', 'actions'];

  constructor(
    private userService: ListusersService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.token = localStorage.getItem('token') || '';
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers(this.token).then(
      (data) => {
        this.users = data;
        this.filteredUsers = [...this.users];
      },
      (error) => {
        console.error('Erreur lors de la récupération des utilisateurs', error);
      }
    );
  }

  applyFilter() {
    if (this.searchQuery.trim() === '') {
      this.filteredUsers = [...this.users];
    } else {
      this.filteredUsers = this.users.filter(user =>
        user.username.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }

  // Méthode delete avec confirmation swal
  delete(userId: string) {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: "Cette action est irréversible !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem('token');
        if (!token) return;

        this.authService.deleteUser(userId, token).then(res => {
          Swal.fire(
            'Supprimé !',
            'L\'utilisateur a été supprimé.',
            'success'
          );
          this.loadUsers();
        }).catch((err: any) => {
          Swal.fire(
            'Erreur',
            'Une erreur est survenue lors de la suppression.',
            'error'
          );
          console.error('Erreur suppression', err);
        });
      }
    });
  }

  goToAddUser() {
    this.router.navigate(['/adduser']);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

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
