import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isConnected=false

  constructor(private authService : AuthServiceService, private router : Router) { }

  ngOnInit(): void {
    this.testLogin();
  }

  deconnexion()
  {
    this.authService.logout();
    this.router.navigate(['/home']);

  }

  testLogin()
  {
    
    if(localStorage.getItem("myToken"))
    { 
      this.isConnected=true;
    }else{
       
      this.isConnected=false;
      
    }
  }

  gererAction(): void {
    if (this.isConnected) {
      console.log("ok");
    } else {
      alert("Veuillez vous connecter pour effectuer cette action.");
      this.router.navigate(['/login']);
    }
  }

}
