import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
// import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  user=null;

  constructor(private login:LoginService){

  }

  ngOnInit(): void {
    this.user = this.login.getUser();

    // this.login.getCurrentUser().subscribe(
    //   (user: any) => {
    //     this.user = user;
    //   },
    //   (error) =>{
    //     Swal.fire({
    //       icon:'error',
    //       title:"Cant able to Load User From Server",
    //       showConfirmButton:false,
    //       timer:1000        
    //     });
    //     window.location.reload();
    //   }
    // );
  }

}
