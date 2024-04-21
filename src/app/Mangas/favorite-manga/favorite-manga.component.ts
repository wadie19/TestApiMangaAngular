import { Component, OnInit } from '@angular/core';
import { Manga } from 'src/app/models/manga.model';
import { MangaService } from 'src/app/services/manga.service';

@Component({
  selector: 'app-favorite-manga',
  templateUrl: './favorite-manga.component.html',
  styleUrls: ['./favorite-manga.component.css']
})
export class FavoriteMangaComponent implements OnInit {

  mangasFavoris: Manga[] = [];

  constructor(private favorisService: MangaService) { }

  ngOnInit(): void {
    this.mangasFavoris = this.favorisService.getMangasFavoris();
    console.log(this.mangasFavoris)

  }

  supprimer(manga:Manga) : void{
    this.favorisService.supprimerDesFavoris(manga);
    }

}
