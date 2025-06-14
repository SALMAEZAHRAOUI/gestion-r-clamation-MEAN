import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService,private router: Router) {}

  async onRegister() {
    try {
      const res = await this.authService.register({
        username: this.username,
        email: this.email,
        password: this.password
      });
      console.log('Inscription réussie :', res);
      this.router.navigate(['/login']);
    } catch (err: any) {
      this.errorMessage = err.message || 'Erreur lors de l’inscription';
    }
  }
}
