import { Injectable } from '@angular/core';
import { HttpHeaders , HttpClient} from '@angular/common/http';
import { User } from '../models/user.model';

import { Observable } from 'rxjs';
import { Router } from '@angular/router';
const httpOptions ={
  headers: new HttpHeaders ({'Content-Type': 'application/json'}) }

const AUTH_API = "https://sandbox.manga-db.com/"

@Injectable({
  providedIn: 'root'
})



export class AuthServiceService {

  isConnected=false;


  constructor(private http: HttpClient, private route:Router) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'login',
      {
        email,
        password,
      },
      httpOptions
    );
  }

  isLoggedIn(){

    let token = localStorage.getItem("myToken");
    
    if (token) {
      return true ;
    } else {
      return false;
    }
  }

  logout()
  {
    console.log("logout")
    
    //localStorage.removeItem("myToken");
    //localStorage.removeItem("isLoggedIn");
    this.isConnected=false;
    this.clean();
    this.route.navigate(['/']);
    
  }

  clean(): void {
    window.sessionStorage.clear();
    window.localStorage.clear();    
  }
  

  registerUser(name : string, email: string, password: string, password_confirmation : string){
    return this.http.post(
      AUTH_API + 'register',
      {
        name,
        email,
        password,
        password_confirmation
      },
      httpOptions
    );
  }
}


