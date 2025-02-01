import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit {

  quesId;
  QTitle;
  questions;

  constructor(private _route:ActivatedRoute , private _question:QuestionService ) {

  }

  ngOnInit(): void {  

    this.quesId=this._route.snapshot.params['quesId'];
    this.QTitle=this._route.snapshot.params['title'];

    this._question.getQuestionById(this.quesId).subscribe(
      (data:any)=>{
        console.log(data);
        this.questions=data;
      },
      (error)=>{
        console.log(error);
      }
    )

  }

  updatequestion(){

    Swal.fire({
      icon: 'info',
      title: 'Are you Sure ?',
      confirmButtonText: 'Update',
      showCancelButton: true,
    }).then((result) => {

      if (result.isConfirmed) {

        //update Question calling
        
        this._question.updateQuestion(this.questions).subscribe(
          (data)=>{
            if(this.questions.content.trim() == '' || this.questions.content == null || this.questions.option1.trim() == '' || this.questions.option1 == null ||this.questions.option2.trim() == '' || this.questions.option2 == null ||this.questions.answer.trim() == '' || this.questions.answer == null){
              Swal.fire('error','filed is required','error');
              return;
            }

            Swal.fire('Success','Successfully Update The question','success');
          },
          (error)=>{
            Swal.fire('Error','Unable to Update question','error');
          }
        )

      }
    })

    
  }

}
