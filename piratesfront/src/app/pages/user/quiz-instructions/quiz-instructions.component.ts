import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-quiz-instructions',
  templateUrl: './quiz-instructions.component.html',
  styleUrls: ['./quiz-instructions.component.css']
})
export class QuizInstructionsComponent implements OnInit{

  quizID;
  quizData;
  role;

  constructor(private _quiz:QuizService , private _route:ActivatedRoute , private _login:LoginService, private _router:Router){

  }

  ngOnInit(): void {

      this.role=this._login.getUserRole();
      
      this.quizID=this._route.snapshot.params['quizId'];

      this._quiz.getSingleQuizById(this.quizID).subscribe(
        (data)=>{

          this.quizData=data;
          console.log(this.quizData);

        },
        (error)=>{

          Swal.fire('ERROR','Unable to load Component','error');

        }
      )
      
  }

  startquiz(){

    Swal.fire({
      title:'Do you want to start the quiz >',
      showCancelButton: true,
      confirmButtonText: 'Start',
      icon:'info'
    }).then((result)=>{
      if(result.isConfirmed){
        if(this.role == 'NORMAL'){
          this._router.navigate(['/start-quiz/'+this.quizID]);
        }else if(this.role == 'ADMIN'){
          this._router.navigate(['/admin-start-quiz/'+this.quizID]);
        }
      }else if(result.isDismissed){
        if(this.role == 'NORMAL'){
          this._router.navigate(['/user-dashboard/readarticle/'+this.quizID]);
        }else if(this.role == 'ADMIN'){
          this._router.navigate(['/admin/readarticle/'+this.quizID]);
        }
        this._router.navigate(['/user-dashboard/readarticle/'+this.quizID]);
      }
    })
    
  }
  
}
