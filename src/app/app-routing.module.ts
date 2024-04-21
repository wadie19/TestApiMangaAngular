import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { registerLocaleData } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { ListeMangasComponent } from './Mangas/liste-mangas/liste-mangas.component';

const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'home',component:HomeComponent},
    {path:'login',component:LoginComponent},
    {path:'header',component:HeaderComponent},
    {path:'register',component:RegisterComponent},
    {path:'listeMangas',component:ListeMangasComponent},




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
