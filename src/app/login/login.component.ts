import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  async onLogin() {
    try {
      const res = await this.authService.login({
        email: this.email,
        password: this.password
      });

      localStorage.setItem('token', res.token);

      const user = res.user;

      // Redirection selon le rôle
      switch (user.role) {
        case 'admin':
          this.router.navigate(['/admin']);
          break;
        case 'responsable':
          this.router.navigate(['/responsable']);
          break;
        case 'agent':
          this.router.navigate(['/agent']);
          break;
        case 'association':
          this.router.navigate(['/association']);
          break;
        default:
          this.router.navigate(['/citoyen']);
      }
    } catch (err: any) {
      this.errorMessage = err.message || 'Erreur de connexion';
    }
  }
  registerAssociation(){
    this.router.navigate(['/registerAssociation']);
  }
  registerCitoyen(){
    this.router.navigate(['/register']);

  }
}
