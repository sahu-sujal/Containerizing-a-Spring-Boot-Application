import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  baseurl ='http://127.0.0.1:8080/';

  constructor(private _http:HttpClient) { }

  public quizzes(){
    return this._http.get(this.baseurl+'quiz/')
  }

  public addQuiz(quiz){
    return this._http.post(this.baseurl+'quiz/',quiz);
  }

  public deleteQuiz(id){
    return this._http.delete(this.baseurl+'quiz/'+id);
  }

  public getSingleQuizById(id){
    return this._http.get(this.baseurl+'quiz/'+id)
  }

  public updateQuiz(quizdata){
    return this._http.put(this.baseurl+'quiz/',quizdata);
  }

  public getQuizzesOfCategory(cid){
    return this._http.get(this.baseurl+'quiz/category/'+cid);
  }

}
