import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MangaService } from 'src/app/services/manga.service';

@Component({
  selector: 'app-liste-mangas',
  templateUrl: './liste-mangas.component.html',
  styleUrls: ['./liste-mangas.component.css']
})
export class ListeMangasComponent implements OnInit {


  mangas: any[] = [];
  errorMessage: string = '';
  isAscending: boolean = true;

  filteredMangas: any[] = [];

  constructor(private mangaService: MangaService) { }

  ngOnInit(): void {
    // Récupérer le token depuis le localStorage pour l'authorization
    const token = localStorage.getItem('myToken'); 

    if (token) {
      this.mangaService.getAllMangas(token).subscribe(
        (response) => {
          this.mangas = response.data; 
          this.filteredMangas = this.mangas; // Initialisation avec tous les mangas
          this.sortMangas();

        },
        (error) => {
          this.errorMessage = 'Une erreur s\'est produite lors de la récupération des mangas.';
          console.error(error);
        }
      );
    } else {
      this.errorMessage = 'Token d\'authentification non trouvé.';
    }
  }
  // fonction pour classer les mangas par année de sortie
  sortMangas(): void {
    this.mangas.sort((a, b) => {
      const dateA = new Date(a.release_date).getTime();
      const dateB = new Date(b.release_date).getTime();
      return this.isAscending ? dateA - dateB : dateB - dateA;
    });
  }

  //fonction pour l'ordre
  SortOrder(): void {
    this.isAscending = !this.isAscending;
    this.sortMangas(); 
  }


  //mettre en place une barre de recherche
  onSearch(valeur: string): void {
    this.filteredMangas = this.mangas.filter((manga) =>
      manga.name.toLowerCase().includes(valeur.toLowerCase())
    );
  }
}
