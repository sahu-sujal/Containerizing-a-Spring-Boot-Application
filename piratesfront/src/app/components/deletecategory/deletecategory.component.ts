import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryserviceService } from 'src/app/services/categoryservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-deletecategory',
  templateUrl: './deletecategory.component.html',
  styleUrls: ['./deletecategory.component.css']
})
export class DeletecategoryComponent {

  
  catData;
  cId=0;


  constructor(private _category: CategoryserviceService,private _route:ActivatedRoute) { }

  ngOnInit(): void {

    this.cId = this._route.snapshot.params['cid']

    this._category.getCategoryById(this.cId).subscribe(
      (data:any) => {

        this.catData=data;
        console.log(this.catData);

      },
      (error) => {
       console.log(error);
      });
  }

  //update category

  updateCategory() {
    if (this.catData.title.trim() == '' || this.catData.title == null || this.catData.description.trim() == '' || this.catData.description == null || this.catData.cid == null) {

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
        this._category.updateCategory(this.catData).subscribe(
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
