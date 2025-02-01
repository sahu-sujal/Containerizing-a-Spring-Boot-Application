import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

  panelOpenState = false;

  Article = []

  constructor(private _quiz: QuizService) {

  }

  ngOnInit(): void {

    this._quiz.quizzes().subscribe(
      (data: any) => {
        this.Article = data;
        console.log(this.Article)
      },
      (error) => {

        console.log(error);
        Swal.fire('Error !!', 'Error in Loading Data', 'error');

      }
    )

  }

  deleteQuiz(id) {

    Swal.fire({
      icon: 'info',
      title: 'Are you Sure ?',
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result) => {

      if (result.isConfirmed) {

        this._quiz.deleteQuiz(id).subscribe(
          (data) => {

            this.Article = this.Article.filter((article) => article.qid != id);
            Swal.fire("Success", "Quiz Deleted", 'success');

          },
          (error) => {
            Swal.fire("error!!", "error in Deleting quiz", 'error');
          }
        )
        
      }

    })


  }

}
