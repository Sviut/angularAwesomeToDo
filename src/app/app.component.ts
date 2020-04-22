import {Component, OnInit} from '@angular/core'
import {Task} from './model/Task'
import {DataHandlerService} from './service/data-handler.service'
import {Category} from './model/Category'
import {Priority} from './model/Priority'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: []
})
export class AppComponent implements OnInit {
  title = 'angularAwesomeToDo'

  tasks: Task[]
  categories: Category[]
  priorities: Priority[]
  selectedCategory: Category

  private priorityFilter: Priority
  private statusFilter: boolean
  private searchTaskText: string
  private searchCategoryText: string

  constructor(
    private dataHandlerService: DataHandlerService
  ) {
  }

  ngOnInit(): void {
    this.dataHandlerService.getAllPriorities().subscribe(priorities => this.priorities = priorities)
    this.dataHandlerService.getAllCategories().subscribe(categories => this.categories = categories)

    this.onSelectCategory(null)
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
    this.dataHandlerService.deleteCategory(category.id).subscribe(() => {
      this.selectedCategory = null
      this.onSearchCategory(this.searchCategoryText)
    })
  }

  onUpdateCategory(category: Category) {
    this.dataHandlerService.updateCategory(category).subscribe(() => {
      this.onSearchCategory(this.searchCategoryText)
    })
  }

  onFilterTasksByStatus(status: boolean) {
    this.statusFilter = status
    this.updateTasks()
  }

  onSearchTasks(searchString: string) {
    this.searchTaskText = searchString
    this.updateTasks()
  }

  updateTasks() {
    this.dataHandlerService.searchTasks(
      this.selectedCategory,
      this.searchTaskText,
      this.statusFilter,
      this.priorityFilter
    ).subscribe(tasks => this.tasks = tasks)
  }

  onFilterTasksByPriority(priority: Priority) {
    this.priorityFilter = priority
    this.updateTasks()
  }

  onAddTask(task: Task) {
    this.dataHandlerService.addTask(task).subscribe(() => {
      this.updateTasks()
    })
  }

  onAddCategory(title: string) {
    this.dataHandlerService.addCategory(title).subscribe(() => this.updateCategories())
  }

  private updateCategories() {
    this.categories.forEach(() => this.dataHandlerService.getAllCategories()
      .subscribe(categories => this.categories = categories))
  }

  onSearchCategory(title: string) {
    this.searchCategoryText = title

    this.dataHandlerService.searchCategory(title).subscribe(categories => this.categories = categories)
  }
}
