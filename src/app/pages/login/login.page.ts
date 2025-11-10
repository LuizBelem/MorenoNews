import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LoginPage {
  name = '';
  email = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    if (!this.name || !this.email) return;
    this.auth.login(this.name, this.email);
    this.router.navigateByUrl('/home', { replaceUrl: true });
  }

  // 🔹 Adicione esta função:
  goHome() {
    this.router.navigate(['/home']);
  }

  // Logout: limpa o usuário e retorna para a home
  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/home', { replaceUrl: true });
  }
}
