import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Manga } from 'src/app/models/manga.model';
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

  categories: any[] = [];

  categoriesFiltred: any[] = [];

  constructor(private mangaService: MangaService) { }

  ngOnInit(): void {
    // Récupérer le token depuis le localStorage pour l'authorization
    const token = localStorage.getItem('myToken'); 

    if (token) {
      this.mangaService.getAllMangas(token).subscribe(
        (response) => {
          this.mangas = response.data; 
          this.filteredMangas = this.mangas;
          this.sortMangas();
          this.getAllItemTypes(token);

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

  getAllItemTypes(token:string): void {
    this.mangaService.getItemTypes(token).subscribe(
    (response) => {
      this.categoriesFiltred = response.data; 
      console.log(this.categoriesFiltred)

    },
    (error) => {
      this.errorMessage = 'Une erreur s\'est produite lors de la récupération des catégories.';
      console.error(error);
    });
  }


  // fonction pour classer les mangas par année de sortie
  sortMangas(): void {
    this.filteredMangas.sort((a, b) => {
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

  // Méthode pour filtrer les mangas par catégorie
  filterByCat(id: number | undefined): void {

    if (id === undefined) {
      this.filteredMangas = this.mangas;
    } else {
      this.filteredMangas = this.mangas.filter(
        manga => manga.series_type.type.id === id);
    }
  }


  toggleFavoris(manga: Manga): void {
    if (this.mangaService.estDansFavoris(manga)) {
      this.mangaService.supprimerDesFavoris(manga);
    } else {
      this.mangaService.ajouterAuFavoris(manga);
    }
  }

  // Méthode pour vérifier si un manga est dans les favoris
  estDansFavoris(manga: Manga): boolean {
    return this.mangaService.estDansFavoris(manga);
  }

}
