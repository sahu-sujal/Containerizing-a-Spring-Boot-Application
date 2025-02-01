import { Component, OnInit } from '@angular/core';
import { CategoryserviceService } from 'src/app/services/categoryservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {

  category = {
    title: '',
    description: '',
  };

  constructor(private _category: CategoryserviceService) { }

  ngOnInit(): void { }

  formsubmit() {
    if (this.category.title.trim() == '' || this.category.title == null) {
      Swal.fire('Field is required!!', 'Error!!', 'error');
      return;
    }

    //calling add category function

    this._category.addCategory(this.category).subscribe(
    (data: any) => {  
      this.category.description='';
      this.category.title='';
      Swal.fire("Success!!", 'Category Added Successfully', 'success');

    },
    (error) => {

        Swal.fire("Error!!", "Server Error Can't Add Category !!", 'error');
        console.log(error);

      });
  }

}
