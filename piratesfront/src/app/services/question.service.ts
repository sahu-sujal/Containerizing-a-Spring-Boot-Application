import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  baseurl ='http://127.0.0.1:8080/';

  constructor(private _http:HttpClient) { }

  public getQuestionOfQuiz(qid){
    return this._http.get(this.baseurl+'question/quiz/all/'+qid);
  }

  public getQuestionOfQuizfortest(qid){
    return this._http.get(this.baseurl+'question/quiz/'+qid);
  }

  public addQuestionsOfQuiz(questions){
    return this._http.post(this.baseurl+'question/',questions);
  }

  public deleteQuestionByID(quesId){
    return this._http.delete(this.baseurl+'question/'+quesId);
  }

  public getQuestionById(Id){
    return this._http.get(this.baseurl+'question/'+Id);
  }

  public updateQuestion(question){
    return this._http.put(this.baseurl+'question/',question);
  }

}
