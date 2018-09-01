import { Component, OnInit, Injectable, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService, SESSION_STORAGE, WebStorageService, LOCAL_STORAGE } from 'angular-webstorage-service';
import { UserService } from '../../user.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUp: FormGroup;
  msg="Registration Successfull"
  signUpDetails=[];
  s;

  constructor(@Inject(LOCAL_STORAGE) @Inject(SESSION_STORAGE) private storage: StorageService, private router:Router, public user: UserService) {
    this.signUpDetails=JSON.parse(localStorage.getItem('userInfo'))
   }

  ngOnInit() {
    this.signUp = new FormGroup({
      'firstName': new  FormControl(null, Validators.required),
      'lastName': new  FormControl(null, Validators.required),
      'email': new  FormControl(null,[ Validators.required, Validators.email]),
      'password': new  FormControl(null, [Validators.minLength(6), Validators.required])
    });

    console.log(localStorage.length)
  }

  onSubmit()
  {
    // console.log(this.signUp.value);
    // this.signUpDetails.push(this.signUp.value)
    // console.log(this.signUpDetails);
    // if(localStorage.length==0)
    // {
    //   localStorage.setItem(JSON.stringify('user'+this.i++), JSON.stringify(this.signUp.value))
    //   this.signUp.reset();
    //   this.router.navigate(['']);
    // }
    // else
    // {
    //   var j=0;
    //   const temp=JSON.parse(localStorage.getItem(JSON.stringify('user'+j++)));
    //   if(this.signUp.value.email==temp.email)
    //   {
    //     this.s="User is already Registered! Try using diffrent Email address";
    //   }
    //   else
    //   {
    //     localStorage.setItem(JSON.stringify('user'+this.i++), JSON.stringify(this.signUp.value))
    //     this.signUp.reset();
    //     this.router.navigate(['']);
    //   }
    // }
    if(this.signUpDetails.length==0)
    {
      this.signUpDetails.push(this.signUp.value)  
      localStorage.setItem('userInfo', JSON.stringify(this.signUpDetails));
      this.signUp.reset();
      this.user.registrationSuccess(this.msg);
      this.router.navigate(['']);

    }
    else
    {
        var j=0;
        this.signUpDetails=JSON.parse(localStorage.getItem('userInfo'));
        for(let i=0;i<this.signUpDetails.length;i++)
        {
          if(this.signUp.value.email==this.signUpDetails[i]['email'])
          {
            j=1;
            this.s="User is already Registered! Try using diffrent Email address";
            break;
          }
        }
        if(j==0)
        {
          this.signUpDetails.push(this.signUp.value)  
          localStorage.setItem('userInfo', JSON.stringify(this.signUpDetails));
          this.user.registrationSuccess(this.msg);
          this.signUp.reset();
          this.router.navigate(['']);
        }
            
        
    }

    
  }

  

}
