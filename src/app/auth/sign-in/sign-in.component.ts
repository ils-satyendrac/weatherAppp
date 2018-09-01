import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  signIn: FormGroup;
  s;
  msg;
  constructor(private router: Router, public user: UserService) { 
    const x=sessionStorage.getItem('user')
    if(x)
    {
      this.user.setUserLoggedIn();
    }
  }

  ngOnInit() {

    
    this.msg= this.user.message;
    console.log("hello"+this.msg)
    this.signIn = new FormGroup({
      'email': new  FormControl(null, [Validators.required, Validators.email]),
      'password': new  FormControl(null, [Validators.minLength(6), Validators.required])

    });
  }

  onSubmit()
  {
    const temp=JSON.parse(localStorage.getItem('userInfo'));
    for(let i=0;i<temp.length;i++)
    {
      if(this.signIn.value.email==temp[i]['email'] && this.signIn.value.password==temp[i]['password'])
      {
        this.user.setUserLoggedIn();
        sessionStorage.setItem('user', temp[i]['email'])
        //this.user.registrationHide();
        this.router.navigate(['/weatherReport']);
        break;
      }
      else
      {
        this.s="Entered a wrong Email or Password";
      }
    }

    
  }
}
