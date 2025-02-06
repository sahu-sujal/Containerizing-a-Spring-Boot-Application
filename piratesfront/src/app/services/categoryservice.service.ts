import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryserviceService {

  baseurl ='http://127.0.0.1:8082/';

  constructor(private http:HttpClient) { }

  //load all the category
  public categories(){
    return this.http.get(this.baseurl+'category/');
  }

  //add new category
  public addCategory(category){
    return this.http.post(this.baseurl+'category/',category)
  }

  //delete category
  public deleteCategory(id){
    return this.http.delete(this.baseurl+'category/'+id);
  }

  //update categroy
  public updateCategory(update){
    return this.http.put(this.baseurl+'category/',update);
  }

  //get single category by id
  public getCategoryById(id){
    return this.http.get(this.baseurl+'category/'+id);
  }
}
