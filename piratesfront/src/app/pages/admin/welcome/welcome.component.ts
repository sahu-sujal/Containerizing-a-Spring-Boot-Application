import { Component } from '@angular/core';
import { CategoryserviceService } from 'src/app/services/categoryservice.service';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {

  category;
  role;
  
  constructor(private _cat:CategoryserviceService, private _login:LoginService){

  }

  ngOnInit(): void {

    this.role=this._login.getUserRole();
    
    this._cat.categories().subscribe(
      (data)=>{
        this.category=data;
      },
      (error)=>{
        Swal.fire('error','unable to load data from server','error');
      }
    );

  }
  
}
