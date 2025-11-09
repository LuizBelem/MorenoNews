import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NewsService {
  private API_KEY = '7e620865652943a49c08649781e58a8d';
  private BASE_URL = 'https://newsapi.org/v2';

  constructor(private http: HttpClient) {}

  getTopHeadlines(
    page: number,
    pageSize: number,
    category: 'general' | 'sports' | '' = ''
  ): Observable<any> {
    let params = new HttpParams()
      .set('apiKey', this.API_KEY)
      .set('country', 'br')
      .set('page', page)
      .set('pageSize', pageSize);

    if (category) {
      params = params.set('category', category);
    }

    return this.http.get(`${this.BASE_URL}/top-headlines`, { params });
  }

  searchEverything(
    query: string,
    page: number,
    pageSize: number
  ): Observable<any> {
    const params = new HttpParams()
      .set('apiKey', this.API_KEY)
      .set('language', 'pt')
      .set('sortBy', 'publishedAt')
      .set('q', query)
      .set('page', page)
      .set('pageSize', pageSize);

    return this.http.get(`${this.BASE_URL}/everything`, { params });
  }
}
