import { Component , OnInit} from '@angular/core';
import { CategoryserviceService } from 'src/app/services/categoryservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit{

  category;
  
  constructor(private _cat:CategoryserviceService){

  }

  ngOnInit(): void {

    this._cat.categories().subscribe(
      (data)=>{
        this.category=data;
      },
      (error)=>{
        Swal.fire('error','unable to load data from server','error');
      }
    );

  }
}
