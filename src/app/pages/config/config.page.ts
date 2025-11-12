import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  SettingsService,
  Theme,
  FontSize
} from '../../services/settings';
import { AuthService } from '../../services/auth';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-config',
  standalone: true,
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ConfigPage implements OnInit {
  theme: 'light' | 'dark' = 'dark';
  fontSize: FontSize = 'medium';
  avatar = '';

  avatars = [
    'assets/avatars/avatar1.png',
    'assets/avatars/avatar2.png',
    'assets/avatars/avatar3.png'
  ];

  constructor(
    private settings: SettingsService,
    private router: Router,
    private auth: AuthService,
    private themeService: ThemeService
  ) {
    const s = this.settings.current;
    this.fontSize = s.fontSize;
    this.avatar = s.avatar;
  }

  ngOnInit() {
    this.theme = this.themeService.getTheme();
  }

  goHome() {
    this.router.navigateByUrl('/home');
  }

  apply() {
    this.settings.update({
      fontSize: this.fontSize,
      avatar: this.avatar
    });
  }

  selectAvatar(url: string) {
    this.avatar = url;
    this.apply();
  }

  toggleTheme(event: any) {
    const newTheme: 'light' | 'dark' = event.detail.value;
    this.themeService.setTheme(newTheme);
    this.theme = newTheme;
  }

  // Logout helper: limpa o usuário e retorna para a home
  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/home', { replaceUrl: true });
  }
}
