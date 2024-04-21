import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../services/auth-service.service';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  constructor(
    private fb: FormBuilder,
    private authService: AuthServiceService,
    private router:Router,
  ) { 
    let formControls = {
      email: new FormControl('',[
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('',[
        Validators.required,
       
      ])
    }

    this.loginForm = this.fb.group(formControls)
  }

  get email() { return this.loginForm.get('email') }
  get password() { return this.loginForm.get('password') }

  
  ngOnInit(): void {
    let isLoggedIn = this.authService.isLoggedIn();

    if (isLoggedIn) {
      this.router.navigate(['home']);
    } 
  }

  login() {
    let data = this.loginForm.value;
    console.log(data);
    let user = new User(null,null,data.email,data.password);
    console.log(user);

    if (

      data.email == 0 ||
      data.password == 0
    )
    {
      alert('Error Message : Remplir votre champs');
    } else {
    this.authService.login(data.email, data.password).subscribe(
      res=>{
        console.log(res);
        let token = res.token;
        let tokenSansPrefixe = token.split('|')[1];
        localStorage.setItem("myToken",tokenSansPrefixe);

        this.router.navigate(['home']);
      },
      err=>{
        console.log(err);
        
      }
    )   }
  }

}