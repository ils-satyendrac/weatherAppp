import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  message="";
  public isUserLoggedIn;
  private username;
  private registartion;
  constructor() { 
    var x=sessionStorage.getItem('user');
    this.registartion=false;
    if(x)
    this.isUserLoggedIn=true;
    else
    this.isUserLoggedIn=false;

  }

  setUserLoggedIn()
  {
    this.isUserLoggedIn=true;
   
  }

  getUserLoggedIn()
  {
    return this.isUserLoggedIn;
  }

  logOut(){
    this.isUserLoggedIn=false;
    sessionStorage.removeItem('user');
  }

  registrationSuccess(msg: string){
    this.registartion=true;
    this.message=msg;
  }
  getRegistrationSuccess(){
    return this.registartion;
  }
}
