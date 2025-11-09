import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  SettingsService,
  Theme,
  FontSize
} from '../../services/settings';

@Component({
  selector: 'app-config',
  standalone: true,
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ConfigPage {
  theme: Theme = 'dark';
  fontSize: FontSize = 'medium';
  avatar = '';

  avatars = [
    'assets/avatars/avatar1.png',
    'assets/avatars/avatar2.png',
    'assets/avatars/avatar3.png'
  ];

  constructor(private settings: SettingsService, private router: Router) {
    const s = this.settings.current;
    this.theme = s.theme;
    this.fontSize = s.fontSize;
    this.avatar = s.avatar;
  }

  goHome() {
    this.router.navigateByUrl('/home');
  }

  apply() {
    this.settings.update({
      theme: this.theme,
      fontSize: this.fontSize,
      avatar: this.avatar
    });
  }

  selectAvatar(url: string) {
    this.avatar = url;
    this.apply();
  }

  toggleTheme(event: any) {
    this.theme = event.detail.checked ? 'dark' : 'light';
    this.apply();
  }
}
