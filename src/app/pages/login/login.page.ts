import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LoginPage implements OnInit {
  name = '';
  email = '';
  password = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private themeService: ThemeService
  ) {}

  ngOnInit() {
    // Garante que o tema seja aplicado ao carregar a página
    const theme = this.themeService.getTheme();
    this.themeService.setTheme(theme);
  }

  submit() {
    if (!this.name || !this.email) return;
    this.auth.login(this.name, this.email);
    this.router.navigateByUrl('/home', { replaceUrl: true });
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/home', { replaceUrl: true });
  }
}
