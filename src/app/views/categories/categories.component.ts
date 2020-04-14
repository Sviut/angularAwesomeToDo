import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataHandlerService} from 'src/app/service/data-handler.service';
import {Category} from 'src/app/model/Category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  @Input()
  categories: Category[]

  @Output()
  selectCategory = new EventEmitter<Category>()

  selectedCategory: Category

  constructor(private dataHandler: DataHandlerService) {
  }

  ngOnInit(): void {
  }

  showTaskByCategory(category: Category) {

    if (this.selectedCategory === category) {
      return
    }

    this.selectedCategory = category

    this.selectCategory.emit(this.selectedCategory)
  }

}
