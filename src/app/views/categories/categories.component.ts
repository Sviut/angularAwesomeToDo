import {Component, Input, OnInit} from '@angular/core';
import {DataHandlerService} from 'src/app/service/data-handler.service';
import {Category} from 'src/app/model/Category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  
  @Input()
  private categories: Category[]

  private selectedCategory: Category

  constructor(private dataHandler: DataHandlerService) {
  }

  ngOnInit(): void {
  }

  showTaskByCategory(category: Category) {
    // this.selectedCategory = category
    // this.dataHandler.fillTasksByCategory(category)
  }
}
