import { Component, OnInit } from '@angular/core';
import { CategoryserviceService } from 'src/app/services/categoryservice.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  Categories = []

  quizData = {
    title: '',
    description: '',
    article: '',
    image: '',
    maxMarks: '',
    numberOfQuestions: '',
    active: true,
    category: {
      cid: '',
    }
  }

  constructor(private cat: CategoryserviceService, private _quiz: QuizService) {

  }

  ngOnInit(): void {

    this.cat.categories().subscribe(
      (data: any) => {
        this.Categories = data;
        console.log(this.Categories);
      },
      (error) => {

        console.log();
        Swal.fire('Error', 'Error in loading Data', 'error');

      }
    );
  }

  addquiz() {

    if (this.quizData.title.trim() == '' || this.quizData.title == null || this.quizData.description.trim() == '' || this.quizData.description == null || this.quizData.article.trim() == '' || this.quizData.article == null || this.quizData.maxMarks == null || this.quizData.numberOfQuestions == null || this.quizData.category.cid == null) {

      Swal.fire("Error","field is required","error");
      return;
    }
    let mm=150;
    if(this.quizData.maxMarks > '200' || this.quizData.numberOfQuestions > '20'){
      Swal.fire("Error","Maximum marks can't be more the 200","error");
      return;
    }
    
    this._quiz.addQuiz(this.quizData).subscribe(
     (data:any)=>{
      Swal.fire('Success','Succesfully Added Quiz','success');

      this.quizData = {
        title: '',
        description: '',
        article: '',
        image: '',
        maxMarks: '',
        numberOfQuestions: '',
        active: true,
        category: {
          cid: '',
        }
      }
     },
     (error)=>{
      Swal.fire('Error','Unable to Add Quiz','error');
     } 
    );

  }
}
