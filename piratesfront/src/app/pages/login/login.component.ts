import { Component , OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginData={
    username:'',
    password:'',
  }

  constructor(private snack:MatSnackBar,private login:LoginService,private router:Router){
  }

  ngOnInit() {

  }

  formSubmit(){
    console.log("login form submited");

    if(this.loginData.username.trim() == '' || this.loginData.username == null){

      Swal.fire({
        icon:'error',
        title:'Username is required',
        showConfirmButton:false,
        timer:1000        
      })
      return;
    }else if(this.loginData.password.trim() == '' || this.loginData.password == null){
      
      Swal.fire({
        icon:'error',
        title:'Password is required',
        showConfirmButton:false,
        timer:1000        
      })
      return;
    }

    //request server to generate Token

    this.login.generateToken(this.loginData).subscribe((data:any) => {

      console.log('success');
        console.log(data);

        //Login : on the baisis of Roles
        this.login.loginuser(data.token);

        this.login.getCurrentUser().subscribe(
          (user:any)=>{
            this.login.setUser(user);
            console.log(user);

            //redirect ....ADMIN:Admin Dashboard,.....NORMAL:Normal Dashboard


            if(this.login.getUserRole() =="ADMIN"){
              //admin dashboard
              this.router.navigate(['admin'])
              this.login.loginStatusSubject.next(true);
            }else if(this.login.getUserRole()=="NORMAL"){
              //Normal User Dashboard
              this.router.navigate(['user-dashboard'])
              this.login.loginStatusSubject.next(true);
            }else{
              this.login.Logout();
            }
            
            
          });
        

      },
      (error) => {
        console.log('Error!!');
        console.log(error);
        Swal.fire('Try Again' ,' Invalid Username or Password!!','error');
        
      }

    );


  }

  clearanimation(){
    Swal.fire({
      icon: 'success',
      title: 'Successfully cleared',
      showConfirmButton: false,
      timer: 1000
    })
  }

}
