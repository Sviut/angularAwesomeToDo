import {Component, OnInit, ViewChild, AfterViewInit, Input, Output, EventEmitter} from '@angular/core';
import {Task} from "../../model/Task";
import {DataHandlerService} from "../../service/data-handler.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {EditTaskDialogComponent} from "../../dialog/edit-task-dialog/edit-task-dialog.component";


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {


  displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category']
  dataSource: MatTableDataSource<Task>

  @ViewChild(MatPaginator, {static: false}) private paginator: MatPaginator
  @ViewChild(MatSort, {static: false}) private sort: MatSort

  tasks: Task[]

  @Input('tasks')
  private set setTasks(tasks: Task[]) {
    this.tasks = tasks
    this.fillTable()
  }

  @Output()
  updateTask = new EventEmitter<Task>()

  constructor(
    private dataHandler: DataHandlerService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource()
    this.fillTable()
  }

  toggleTaskCompleted(task: Task) {
    task.completed = !task.completed
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
      data: [task, 'Редактирование задачи'],
      autoFocus: false
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result as Task) {
        this.updateTask.emit(task)
        return
      }
    })
  }
}
