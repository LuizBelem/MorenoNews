import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterOutlet } from '@angular/router';
import { SettingsService } from './services/settings';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IonicModule],
  template: `
    <ion-app>
      <ion-router-outlet></ion-router-outlet>
    </ion-app>
  `
})
export class AppComponent implements OnInit {
  constructor(
    private settings: SettingsService,
    private themeService: ThemeService
  ) {
    this.settings.init();
  }

  ngOnInit() {
    // Inicializa o tema ao carregar a aplicação
    const theme = this.themeService.getTheme();
    this.themeService.setTheme(theme);
  }
}
