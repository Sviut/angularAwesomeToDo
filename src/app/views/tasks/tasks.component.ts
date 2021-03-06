import {Component, OnInit, ViewChild, Input, Output, EventEmitter} from '@angular/core'
import {Task} from '../../model/Task'
import {MatTableDataSource} from '@angular/material/table'
import {MatPaginator} from '@angular/material/paginator'
import {MatSort} from '@angular/material/sort'
import {MatDialog} from '@angular/material/dialog'
import {EditTaskDialogComponent} from '../../dialog/edit-task-dialog/edit-task-dialog.component'
import {ConfirmDialogComponent} from '../../dialog/confirm-dialog/confirm-dialog.component'
import {Category} from '../../model/Category'
import {Priority} from '../../model/Priority'
import {OperType} from '../../dialog/OperType'


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {


  displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category', 'operations', 'select']
  dataSource: MatTableDataSource<Task>

  @ViewChild(MatPaginator, {static: false}) private paginator: MatPaginator
  @ViewChild(MatSort, {static: false}) private sort: MatSort

  priorities: Priority[]
  tasks: Task[]

  @Input('tasks')
  private set setTasks(tasks: Task[]) {
    this.tasks = tasks
    this.fillTable()
  }

  @Input('priorities')
  set setPriorities(priorities: Priority[]) {
    this.priorities = priorities
  }

  @Output()
  updateTask = new EventEmitter<Task>()

  @Output()
  addTask = new EventEmitter<Task>()

  @Output()
  deleteTask = new EventEmitter<Task>()

  @Output()
  selectCategory = new EventEmitter<Category>()

  @Output()
  filterByTitle = new EventEmitter<string>()

  @Output()
  filterByPriority = new EventEmitter<Priority>()

  @Output()
  filterByStatus = new EventEmitter<boolean>()

  @Input()
  selectedCategory: Category

  searchTaskText = ''
  selectedStatusFilter: boolean = null
  selectedPriorityFilter: Priority

  constructor(
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource()
    this.fillTable()
  }

  onToggleTaskCompleted(task: Task) {
    task.completed = !task.completed
    this.updateTask.emit(task)
  }

  getPriorityColor(task: Task): string {
    if (task.completed) {
      return '#F8F9FA'
    }

    if (task.priority && task.priority.color) {
      return task.priority.color
    }

    return '#fff'
  }

  private fillTable(): void {

    if (!this.dataSource) {
      return
    }

    this.dataSource.data = this.tasks

    this.addTableObjects()

    this.dataSource.sortingDataAccessor = (task, colName): any => {
      switch (colName) {
        case 'priority': {
          return task.priority ? task.priority.id : null
        }
        case 'category': {
          return task.category ? task.category.title : null
        }
        case 'date': {
          return task.date ? task.date : null
        }
        case 'title': {
          return task.title
        }
      }
    }
  }

  private addTableObjects() {
    this.dataSource.sort = this.sort
    this.dataSource.paginator = this.paginator

  }

  openEditTaskDialog(task: Task): void {
    const dialogRef = this.dialog.open(EditTaskDialogComponent, {
      data: [task, 'Редактирование задачи', OperType.EDIT],
      autoFocus: false,
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'complete') {
        task.completed = true
        this.updateTask.emit(task)
        return
      }

      if (result === 'activate') {
        task.completed = false
        this.updateTask.emit(task)
        return
      }

      if (result === 'delete') {
        this.deleteTask.emit(task)
        return
      }

      if (result as Task) {
        this.updateTask.emit(task)
        return
      }
    })
  }

  openDeleteDialog(task: Task) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        message: `Вы действительно хотите удалить задачу: "${task.title}" ?`
      },
      autoFocus: false
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteTask.emit(task)
      }
    })
  }


  onSelectCategory(category: Category) {
    this.selectCategory.emit(category)
  }

  onFilterByTitle() {
    this.filterByTitle.emit(this.searchTaskText)
  }

  onFilterByStatus(value: boolean) {
    if (value !== this.selectedStatusFilter) {
      this.selectedStatusFilter = value
      this.filterByStatus.emit(this.selectedStatusFilter)
    }
  }

  onFilterByPriority(value: Priority) {
    if (value !== this.selectedPriorityFilter) {
      this.selectedPriorityFilter = value
      this.filterByPriority.emit(this.selectedPriorityFilter)
    }
  }

  openAddTaskDialog() {
    const task = new Task(null, '', false, null, this.selectedCategory)

    const dialogRef = this.dialog.open(EditTaskDialogComponent, {data: [task, 'Добавление задачи', OperType.ADD]})

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addTask.emit(task)
      }
    })
  }
}
