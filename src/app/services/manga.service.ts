import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Manga } from '../models/manga.model';
const AUTH_API = "https://sandbox.manga-db.com/"

@Injectable({
  providedIn: 'root'
})
export class MangaService {
  
  private mangasFavoris: Manga[] = [];
  

  constructor(private http: HttpClient) { }

  getAllMangas(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });

    return this.http.get<any>(AUTH_API + 'book', { headers: headers });
  }

  getMangaById(token: string, id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });

    return this.http.get<any>(AUTH_API + 'book/' + id, { headers });
      
  }
  public getItemTypes(token : string) : Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });

    return this.http.get<any[]>(AUTH_API + 'itemtype',  { headers: headers });
  }

  ajouterAuFavoris(manga: Manga): void {
    if (!this.mangasFavoris.includes(manga)) {
      this.mangasFavoris.push(manga);
      console.log('ajoute')
    }
  }

  // Méthode pour supprimer un manga des favoris
  supprimerDesFavoris(manga: Manga): void {
    const index = this.mangasFavoris.indexOf(manga);
    if (index !== -1) {
      this.mangasFavoris.splice(index, 1);
    }
  }

  // Méthode pour récupérer tous les mangas favoris
  getMangasFavoris(): Manga[] {
    return this.mangasFavoris;
  }

  estDansFavoris(manga: Manga): boolean {
    return this.mangasFavoris.includes(manga);
  }

}
