import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService: UserService, private snackbar: MatSnackBar) { }

  public user = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',

  }

  ngOnInit() {

  }

  clearanimation(){
    Swal.fire({
      icon: 'success',
      title: 'Successfully cleared',
      showConfirmButton: false,
      timer: 1500
    })
  }

  formsubmit() {
    console.log(this.user);

    if (this.user.username == '' || this.user.password == '' || this.user.firstName == '' || this.user.lastName == '' || this.user.phone == '' || this.user.email == '' || this.user.username == null || this.user.password == null || this.user.firstName == null || this.user.lastName == null || this.user.phone == null || this.user.email == null) {
  
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Filed is required!!❌',
      });
      return;
    }

    //addUser : userService
    this.userService.addUser(this.user).subscribe(
      (data:any) => {
        //sucess
        console.log(data);
        
        Swal.fire('Congrulations!!🎊🎊',data.username+' Successfully Registered!!','success');

       
      },
      (error) => {
        console.log(error);

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.error.message,
        });
      }
    )
  }

}
