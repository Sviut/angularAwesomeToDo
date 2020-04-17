import {Component, OnInit} from '@angular/core';
import {Task} from "./model/Task";
import {DataHandlerService} from "./service/data-handler.service";
import {Category} from "./model/Category";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: []
})
export class AppComponent implements OnInit {
  title = 'angularAwesomeToDo';

  tasks: Task[]
  categories: Category[]
  selectedCategory: Category;

  constructor(
    private dataHandlerService: DataHandlerService
  ) {
  }

  ngOnInit(): void {
    this.dataHandlerService.getAllTask().subscribe(tasks => this.tasks = tasks)
    this.dataHandlerService.getAllCategories().subscribe(categories => this.categories = categories)
  }

  onSelectCategory(category: Category) {
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
    this.dataHandlerService.updateTask(task).subscribe(() => {
      this.dataHandlerService.searchTasks(
        this.selectedCategory,
        null,
        null,
        null
      ).subscribe((tasks: Task[]) => {
        this.tasks = tasks
      })
    })

  }

  onDeleteTask(task: Task) {
    this.dataHandlerService.delete(task.id).subscribe(() => {
      this.dataHandlerService.searchTasks(
        this.selectedCategory,
        null,
        null,
        null
      ).subscribe((tasks: Task[]) => {
        this.tasks = tasks
      })
    })
  }

  onDeleteCategory(category: Category) {
    this.dataHandlerService.deleteCategory(category.id).subscribe(cat => {
      this.selectedCategory = null
      debugger
      this.onSelectCategory(this.selectedCategory)
    })
  }

  onUpdateCategory(category: Category) {
    this.dataHandlerService.updateCategory(category).subscribe(() => {
      this.onSelectCategory(this.selectedCategory)
    })
  }
}
