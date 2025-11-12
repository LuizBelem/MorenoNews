import { Injectable, Inject, Renderer2, RendererFactory2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private renderer: Renderer2;
  private currentTheme: Theme = 'dark';

  constructor(
    @Inject(DOCUMENT) private document: Document,
    rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.loadSavedTheme();
  }

  private loadSavedTheme() {
    const saved = localStorage.getItem('theme') as Theme | null;
    if (saved) {
      this.setTheme(saved);
    } else {
      this.setTheme('dark');
    }
  }

  setTheme(theme: Theme) {
    this.currentTheme = theme;

    // Remove ambas as classes primeiro para garantir limpeza
    this.renderer.removeClass(this.document.body, 'dark-theme');
    this.renderer.removeClass(this.document.body, 'light-theme');

    if (theme === 'dark') {
      this.renderer.addClass(this.document.body, 'dark-theme');
    } else {
      this.renderer.addClass(this.document.body, 'light-theme');
    }

    localStorage.setItem('theme', theme);
  }

  toggleTheme() {
    const next: Theme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(next);
  }

  getTheme(): Theme {
    return this.currentTheme;
  }
}
