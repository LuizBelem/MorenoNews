import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, InfiniteScrollCustomEvent} from '@ionic/angular';
import { SourceNamePipe } from '../pipes/source-name.pipe';
import { NewsService } from '../services/news';
import { SettingsService } from '../services/settings';
import { AuthService } from '../services/auth';
import { ThemeService } from '../services/theme.service';
import { Router } from '@angular/router';
import { HighlightDirective } from '../diretiva/highlight.directive';

type FilterType = 'news' | 'sports' | 'music';
@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule, SourceNamePipe, HighlightDirective]
})
export class HomePage implements OnInit {
  articles: any[] = [];
  page = 1;
  pageSize = 10;
  loading = false;
  noMore = false;

  filter: FilterType = 'news';
  searchText = '';

  lastArticles: any[] = [];
  avatarUrl = '';
  isLogged = false;

  constructor(
    private news: NewsService,
    private settings: SettingsService,
    private auth: AuthService,
    private themeService: ThemeService,
    private router: Router
  ) {}

  ngOnInit() {
    // Inicializa o tema
    const theme = this.themeService.getTheme();
    this.themeService.setTheme(theme);

    this.loadNews();

    this.settings.settings$.subscribe(s => {
      this.lastArticles = s.lastArticles;
      this.avatarUrl = s.avatar;
    });

    this.auth.user$.subscribe(u => {
      this.isLogged = !!u;
    });
  }

  get categoryForFilter(): 'general' | 'sports' | '' {
    if (this.filter === 'news') return 'general';
    if (this.filter === 'sports') return 'sports';
    return '';
  }

  loadNews(event?: InfiniteScrollCustomEvent) {
    console.log('▶ loadNews chamado — page:', this.page, 'loading:', this.loading, 'noMore:', this.noMore, 'articles:', this.articles.length);
    if (this.loading || this.noMore) {
      event?.target.complete();
      return;
    }
    this.loading = true;

  const observable =
    this.searchText
    ? this.news.searchEverything(this.searchText, this.page, this.pageSize)
    : this.filter === 'music'
      ? this.news.searchEverything('music', this.page, this.pageSize)
      : this.news.getTopHeadlines(
          this.page,
          this.pageSize,
          this.categoryForFilter
        );


    observable.subscribe({
      next: res => {
        console.log('✅ API retornou (page):', this.page, ' totalResults:', res.totalResults, ' newArticles:', (res.articles || []).length);
      // depois de mesclar:
      console.log('➡ Após merge — articles length:', this.articles.length);
        console.log('✅ API retornou:', res);
        const newArticles = (res as any).articles || [];
        if (newArticles.length === 0) {
          this.noMore = true;
        }
        this.articles = [...this.articles, ...newArticles];
        this.page++;
        this.loading = false;
        event?.target.complete();
      },
      error: () => {
        this.loading = false;
        event?.target.complete();
      }
    });
  }

  refresh() {
    this.page = 1;
    this.articles = [];
    this.noMore = false;
    this.loadNews();
  }

  onFilterChange(type: FilterType) {
    this.filter = type;
    this.searchText = '';
    this.refresh();
  }

  onSearchChange(ev: any) {
    this.searchText = ev.detail.value;
    this.page = 1;
    this.articles = [];
    this.noMore = false;
    this.loadNews();
  }

  openArticle(article: any) {
    this.settings.addLastArticle(article);
    window.open(article.url, '_blank');
  }

  selectLastArticle(article: any) {
    this.openArticle(article);
  }

  goLogin() {
    this.router.navigateByUrl('/login');
  }

  goConfig() {
    this.router.navigateByUrl('/config');
  }

  onInfinite(ev: any) {
    console.log('⚡ Infinite scroll disparado!', ev);
    this.loadNews(ev);
  }

}
