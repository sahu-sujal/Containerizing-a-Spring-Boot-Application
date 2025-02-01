import { DOCUMENT, LocationStrategy } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.css']
})
export class StartQuizComponent implements OnInit{
 
  role;

  qID;
  questions;

  marksGot=0;
  correctAnswer=0;
  attempted=0;

  isSubmit = false;

  timer:any;

  constructor(private _login:LoginService,private _locationst:LocationStrategy, private _route:ActivatedRoute, @Inject(DOCUMENT) private document: Document, private _question:QuestionService){

  }

  ngOnInit(): void {
     this.role = this._login.getUserRole();
      this.preventVulnerableButton();
      this.qID=this._route.snapshot.params['quizId'];
      this.loadquestions();
      this.starttimer();
  }
  loadquestions() {
    this._question.getQuestionOfQuizfortest(this.qID).subscribe(
      (data:any)=>{
        this.questions=data;

        this.timer=this.questions.length * 2 * 60;

        this.questions.array.forEach((q) => {
          q['givenAnswer'] = '';
        });
      },
      (error)=>{
        Swal.fire('ERROR','unable to load data from server','error');
      }
    )
  }

  preventVulnerableButton(){
    history.pushState(null,null,location.href);
    this._locationst.onPopState(()=>{
      history.pushState(null,null,location.href);
    })

    this.document.addEventListener('contextmenu', (event) => event.preventDefault());
      
  }

  submitquiz(){

    Swal.fire({
      title:'Do you submit the quiz',
      showCancelButton:true,
      confirmButtonText:'Yes',
      cancelButtonText:'No',
      icon:'info'
    }).then((e)=>{
      if(e.isConfirmed){
        this.evalquiz();
      }
      
    })

  }

  starttimer()
  {
    let t=window.setInterval(()=>{
      if(this.timer <= 0){
        this.evalquiz();
        clearInterval(t);
      }else{
        this.timer--;
      }
    },1000)
  }

  getformattedtime(){
    let mm=Math.floor(this.timer/60);
    let ss=this.timer-mm*60;

    return mm+' min :'+ss+' sec';
  }

  evalquiz(){
    this.isSubmit=true;
        
        //calculation 

        let marksperquestion = this.questions[0].quiz.maxMarks/this.questions.length

        this.questions.forEach(q=>{

          if(q.givenAnswer == q.answer){
            
            this.correctAnswer++;
            this.marksGot += marksperquestion;
          }
          if(q.givenAnswer.trim() != ''){
            this.attempted++;
          }
        })
  }
}
