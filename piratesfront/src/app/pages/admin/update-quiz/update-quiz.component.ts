import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryserviceService } from 'src/app/services/categoryservice.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {
  qId = 0;
  quizData;
  Categories = []


  constructor(private _route: ActivatedRoute, private _quiz: QuizService,private cat: CategoryserviceService) {

  }

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qid']
    this._quiz.getSingleQuizById(this.qId).subscribe(
      (data:any) => {

        this.quizData=data;
        console.log(this.quizData);

      },
      (error) => {
        alert(error);
        // Swal.fire
      });

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

  public UpdateData(){
    if (this.quizData.title.trim() == '' || this.quizData.title == null || this.quizData.description.trim() == '' || this.quizData.description == null || this.quizData.article.trim() == '' || this.quizData.article == null || this.quizData.maxMarks == null || this.quizData.numberOfQuestions == null || this.quizData.category.cid == null) {

      Swal.fire("Error","field is required","error");
      return;
    }

    Swal.fire({
      icon: 'info',
      title: 'Are you Sure ?',
      confirmButtonText: 'Update',
      showCancelButton: true,
    }).then((result) => {

      if (result.isConfirmed) {

        //update category calling
        this._quiz.updateQuiz(this.quizData).subscribe(
          (data)=>{
            Swal.fire('Updated','Successfull Updated','success');
          },
          (error)=>{
            Swal.fire('Error!!','Error in Updating','error')
          }
        )
      }
    })

  }
}

 
   

