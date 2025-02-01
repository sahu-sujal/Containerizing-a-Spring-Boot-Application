import { Component , OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-lodaquiz',
  templateUrl: './user-lodaquiz.component.html',
  styleUrls: ['./user-lodaquiz.component.css']
})
export class UserLodaquizComponent implements OnInit{

  catId;
  quizzes;
  role;

  constructor(private _route:ActivatedRoute, private _quiz:QuizService, private _login:LoginService){

  }

  ngOnInit(): void {
      
    this.role=this._login.getUserRole();

    this._route.params.subscribe(
      (params:any)=>{
        this.catId=params.catId;

        if(this.catId == 0){
          this._quiz.quizzes().subscribe(
            (data)=>{
    
              this.quizzes=data;
              console.log(this.quizzes);
    
            },
            (error)=>{
    
              Swal.fire('error','Unable to fetch data from the server','error');
              console.log(error);
    
            }
          )
        }else{
          
          this.quizzes=[];
          this._quiz.getQuizzesOfCategory(this.catId).subscribe(
            (data)=>{
              console.log(data);
              this.quizzes=data;
            },
            (error)=>{
              Swal.fire('Error','unable to load quiz data','error');
            }
            
          )

        }
      });

    
  }

}
