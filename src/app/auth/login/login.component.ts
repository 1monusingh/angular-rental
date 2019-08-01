import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder ,Validators   } from '@angular/forms';
import {AuthService} from "../shared/auth.service";
import {Router } from '@angular/router';


@Component({
  selector: 'bwm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
   loginForm : FormGroup;
   errors:any[] = [];
  constructor(private fb :FormBuilder,
              private auth: AuthService,
              private router:Router    ) { }

  ngOnInit() {
    this.initForm();
  }
   
  initForm(){
    this.loginForm = this.fb.group({
      email:["",[Validators.required,
                  Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')]],
      password:["",Validators.required]

    })
  }

  isInvalidForm(feildName):boolean{

    return this.loginForm.controls[feildName].invalid && (this.loginForm.controls[feildName].dirty || this.loginForm.controls[feildName].touched); 

  }

  isRequired(feildName):Boolean{
     return this.loginForm.controls[feildName].errors.required;
  }

  login(){
    this.auth.login(this.loginForm.value).subscribe(
      (token)=>{
        this.router.navigate(['/rentals',{registered:true}]); 
      },
      (errorResponse)=>{
        this.errors = errorResponse.error.errors;

      }
    )
  }
}
