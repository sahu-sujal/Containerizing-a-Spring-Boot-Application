import { Component , OnInit } from '@angular/core';
import { CategoryserviceService } from 'src/app/services/categoryservice.service';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-slidebar.component.html',
  styleUrls: ['./user-slidebar.component.css']
})
export class UserSlidebarComponent implements OnInit{

    category;

  constructor(private _login:LoginService, private _cat:CategoryserviceService){

  }

  ngOnInit(): void {
      
    this._cat.categories().subscribe(
      (data)=>{
        this.category=data;
      },
      (error)=>{
        Swal.fire('error','unable to load data from server','error');
      }
    );

  }

    public logout(){
      this._login.Logout();
      window.location.reload();
      // this.login.loginStatusSubject.next(false);
    }
  }

