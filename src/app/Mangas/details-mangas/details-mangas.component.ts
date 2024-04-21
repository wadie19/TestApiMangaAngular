import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Manga } from 'src/app/models/manga.model';
import { MangaService } from 'src/app/services/manga.service';

@Component({
  selector: 'app-details-mangas',
  templateUrl: './details-mangas.component.html',
  styleUrls: ['./details-mangas.component.css']
})
export class DetailsMangasComponent implements OnInit {

  manga : any;
  errorMessage: string = '';

  constructor(private service:MangaService,private activatedRoute:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    const token = localStorage.getItem('myToken'); 

    if (token) {
    this.service.getMangaById(token,this.activatedRoute.snapshot.params['id']).subscribe(
      (response) => {
        this.manga = response.data; 
        console.log(this.manga);

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

  onListmanga(){
    this.router.navigate(['/listeMangas']);
  }

}
