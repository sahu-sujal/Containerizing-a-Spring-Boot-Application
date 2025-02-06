import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseurl ='http://127.0.0.1:8082/';

  constructor(private http:HttpClient) { 
    
  }

  //add user

  public addUser(user:any){
    return this.http.post(this.baseurl+'user/',user);
  }
}
