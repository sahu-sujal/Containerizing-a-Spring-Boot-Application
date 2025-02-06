import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseurl ='http://127.0.0.1:8082/';

  public loginStatusSubject = new Subject<boolean>();

  constructor(private http:HttpClient) {}

  //Current User details Which Is login 
  public getCurrentUser(){
    return this.http.get(this.baseurl+'current-user');
  }

  //generate Token
  public generateToken(loginData:any){

    return this.http.post(this.baseurl+'generate-token',loginData);
  }

  //Login User: Set token in Local Storage
  public loginuser(token:any)
  {
    localStorage.setItem("token",token);
    return true;
  }

  //LoginCheck: Validation for user
  public isLoggedIn()
  {
    let tokenStr = localStorage.getItem("token");
    if(tokenStr == undefined || tokenStr == '' || tokenStr == null){
      return false;
    }else{
      return true;
    }
  }

  //Logout : remove token from local Storage

  public Logout()
  {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return true;
  }

  //Get Token : return token from local Storage

  public getToken(){
    return localStorage.getItem("token");
  }

  //set User Details
  public setUser(user : any){

    localStorage.setItem("user",JSON.stringify(user));

  }

  //get user Details
  public getUser(){
    let userStr=localStorage.getItem("user");
    if(userStr!=null){
      return JSON.parse(userStr);
    }else{
      this.Logout();
      return null;
    }
  }

  //get user role

  public getUserRole(){
    let user=this.getUser();
    return user.authorities[0].authority;
  }

  //when browser closed - psedocode
// $(window).unload(function() {
//   localStorage 
// });


}
