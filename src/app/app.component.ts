import {Component, OnInit} from '@angular/core';
import {Task} from "./model/Task";
import {DataHandlerService} from "./service/data-handler.service";
import {Category} from "./model/Category";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: []
})
export class AppComponent implements OnInit{
  title = 'angularAwesomeToDo';

  tasks: Task[]
  categories: Category[]
  private selectedCategory: Category;

  constructor(
    private dataHandlerService: DataHandlerService
  ) {
  }

  ngOnInit(): void {
    this.dataHandlerService.getAllTask().subscribe(tasks => this.tasks = tasks)
    this.dataHandlerService.getAllCategories().subscribe(categories => this.categories = categories)
  }

  private onSelectCategory(category: Category) {
    this.selectedCategory = category

    this.dataHandlerService.searchTasks(
       this.selectedCategory,
      null,
      null,
      null
    ).subscribe((tasks: Task[]) => {
      this.tasks = tasks
    })
  }

  onUpdateTask(task: Task) {
    console.log(task)
  }
}
