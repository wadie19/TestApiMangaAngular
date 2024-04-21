import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../services/auth-service.service';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  egal : boolean = false;
  registerForm:FormGroup
  constructor(private authService:AuthServiceService, private router:Router,private fb:FormBuilder) { 
    let formControls = {
      name: new FormControl(null,[
        Validators.required,
       
      ]),
      email: new FormControl(null,[
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null,[
        Validators.required,
       
      ]),
      password_confirmation: new FormControl(null,[
        Validators.required,
      
      ])
      }
    

    this.registerForm = this.fb.group(formControls)
  
  }
 
  get name() { return this.registerForm.get('name'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get password_confirmation() { return this.registerForm.get('password_confirmation'); }

  ngOnInit(): void {
  }

  registerUser() {
    console.log(this.registerForm.status)
    if(this.registerForm.status=="INVALID"){
      alert("Merci de remplir les champs")
    return;}
    let data = this.registerForm.value;
    console.log(data);
   
    
 
    let user = new User(null,data.name,data.email,data.password, data.password_confirmation);
    console.log(user);

    this.authService.registerUser(data.name, data.email,data.password, data.password_confirmation).subscribe(
    
      res=>{
        console.log(res);
        
        this.router.navigate(['/login']);
      },
      err=>{
        console.log(err);
        
      }
    )
    // Vérifier l'égalité des mots de passe
  this.egalite();

  if (!this.egal) {
    alert("Les mots de passe ne concordent pas");
    return;
  }
    
  }

  egalite(): void {
    console.log(this.registerForm.value.password);
    console.log(this.registerForm.value.password_confirmation);
    if (this.registerForm.value.password !== this.registerForm.value.password_confirmation) {
      console.log("Les mots de passe ne concordent pas");
      this.egal = false;
    } else {
      this.egal = true;
    }
  }

  

}
