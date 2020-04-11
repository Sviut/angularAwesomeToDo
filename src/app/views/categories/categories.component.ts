import { Component, OnInit } from '@angular/core';
import { DataHandlerService } from 'src/app/service/data-handler.service';
import { Category } from 'src/app/model/Category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  constructor(private dataHandler: DataHandlerService) { }

  categories: Category[]

  ngOnInit(): void {
    this.categories = this.dataHandler.getCategories()
    console.log(this.categories);

  }

}
