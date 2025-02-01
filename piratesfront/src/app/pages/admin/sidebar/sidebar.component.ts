import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(public login:LoginService){}
  
  public logout(){
    this.login.Logout();
    window.location.reload();
    // this.login.loginStatusSubject.next(false);
  }

}
