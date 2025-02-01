import { Component , OnInit} from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  constructor(public login:LoginService){
    // window.onbeforeunload = function () {
    //   localStorage.clear();
    //   window.location.reload();
    //   this.login.loginStatusSubject.next(false);
    //   return '';
    // };
   }

  isLoggedIn=false;
  user = null;
  role ;

  ngOnInit() {
    this.isLoggedIn = this.login.isLoggedIn();
    this.user = this.login.getUser();
    this.login.loginStatusSubject.asObservable().subscribe(data =>{
      this.isLoggedIn = this.login.isLoggedIn();
      this.user = this.login.getUser();
      this.role = this.login.getUserRole();
    });
    this.role = this.login.getUserRole();
   }

  public logout(){
    this.login.Logout();
    window.location.reload();
    // this.login.loginStatusSubject.next(false);
  }
  
}
