import { Component, OnInit } from '@angular/core';
import { CategoryserviceService } from 'src/app/services/categoryservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {

  panelOpenState = false;
  
  categories = []

  constructor(private category:CategoryserviceService) {

  }

  ngOnInit(): void {

    this.category.categories().subscribe((data:any)=>{
      this.categories = data;
      console.log(this.categories);
    },
    (error)=>{

      console.log(error);
      
      Swal.fire('Error !!','Error in loading data!!','error');
     

    });

  }

  deleteCategory(cid) {
    
    Swal.fire({
      icon: 'info',
      title: 'Are you Sure ?',
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result) => {

      if (result.isConfirmed) {

        //delete category calling
        this.category.deleteCategory(cid).subscribe(
          (data: any) => {
            this.categories = this.categories.filter((cat) => cat.cid != cid);
            Swal.fire("Success!!", 'Category delete Successfully', 'success');

          },
          (error) => {

            Swal.fire("Error!!", "Server Error Can't delete Category !!", 'error');
            console.log(error);

          });


      }

    })

  }




}
