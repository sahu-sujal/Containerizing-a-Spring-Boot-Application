import { Component , OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.css']
})
export class ViewQuestionsComponent implements OnInit{

  qId;
  qTitle;

  questions=[];

  constructor(private _route:ActivatedRoute , private _question:QuestionService){

  }

  ngOnInit(): void {

    this.qId = this._route.snapshot.params['qid'];
    this.qTitle = this._route.snapshot.params['title'];
    this._question.getQuestionOfQuiz(this.qId).subscribe(
      (data:any)=>{
        this.questions=data;   
        console.log(this.questions)
      },
      (error)=>{
       Swal.fire('error','Unable to Load data from Server','error');
      });

      
  }

  deletequestion(quesId){
    Swal.fire({
      icon: 'info',
      title: 'Are you Sure ?',
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result) => {

      if (result.isConfirmed) {

        this._question.deleteQuestionByID(quesId).subscribe(
          (data)=>{
            Swal.fire('Success','Successfully delete the quiz','success');
            this.questions=this.questions.filter((question) => question.quesId!=quesId)
          },
          (error)=>{
        
            Swal.fire('Error','Unable to delete','error');
            console.log(error);
        
          }
        )
        
      }

    })
  }

}

