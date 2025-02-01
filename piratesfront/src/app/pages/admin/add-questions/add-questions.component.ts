import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.css']
})

export class AddQuestionsComponent implements OnInit {

  qId;
  qTitle;

  questions = {
    quiz: {},
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: ''
  }

  constructor(private _route: ActivatedRoute , private _question:QuestionService) {

  }

  ngOnInit(): void {

    this.qId = this._route.snapshot.params['qid'];
    this.qTitle = this._route.snapshot.params['title'];
    this.questions.quiz['qid'] = this.qId;
  }

  addQuestion(){
    if(this.questions.content.trim() == '' || this.questions.content == null || this.questions.option1.trim() == '' || this.questions.option1 == null ||this.questions.option2.trim() == '' || this.questions.option2 == null ||this.questions.answer.trim() == '' || this.questions.answer == null){
      Swal.fire('error','filed is required','error');
      return;
    }

    this._question.addQuestionsOfQuiz(this.questions).subscribe(
      (data)=>{

        Swal.fire('success','Successfully Added Question to quiz','success');
        this.questions.content='';
        this.questions.answer='';
        this.questions.option1='';
        this.questions.option2='';
        this.questions.option3='';
        this.questions.option4='';
        this.questions.answer='';

      },
      (error)=>{
        alert('error');
        console.log(error);
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
