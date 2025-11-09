import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Theme = 'dark' | 'light';
export type FontSize = 'small' | 'medium' | 'large';

export interface Settings {
  theme: Theme;
  fontSize: FontSize;
  avatar: string;
  lastArticles: any[];
}

const DEFAULT_SETTINGS: Settings = {
  theme: 'dark',
  fontSize: 'medium',
  avatar: 'assets/avatars/avatar1.png',
  lastArticles: []
};

@Injectable({ providedIn: 'root' })
export class SettingsService {
  private STORAGE_KEY = 'moreno_settings';

  private settingsSubject = new BehaviorSubject<Settings>(this.loadSettings());
  settings$ = this.settingsSubject.asObservable();

  private loadSettings(): Settings {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : DEFAULT_SETTINGS;
  }

  private save(settings: Settings) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(settings));
    this.settingsSubject.next(settings);
    this.applyTheme(settings);
  }

  update(partial: Partial<Settings>) {
    const updated = { ...this.settingsSubject.value, ...partial };
    this.save(updated);
  }

  addLastArticle(article: any) {
    const s = this.settingsSubject.value;
    const filtered = s.lastArticles.filter((a: any) => a.url !== article.url);
    const updated = [article, ...filtered].slice(0, 5);
    this.update({ lastArticles: updated });
  }

  init() {
    this.applyTheme(this.settingsSubject.value);
  }

  private applyTheme(settings: Settings) {
    const body = document.body;
    body.classList.remove('theme-dark', 'theme-light');
    body.classList.add(
      settings.theme === 'dark' ? 'theme-dark' : 'theme-light'
    );

    body.classList.remove('font-small', 'font-medium', 'font-large');
    body.classList.add(`font-${settings.fontSize}`);
  }

  get current(): Settings {
    return this.settingsSubject.value;
  }
}
