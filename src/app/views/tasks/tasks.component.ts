import {Component, OnInit, ViewChild, AfterViewInit, Input} from '@angular/core';
import {Task} from "../../model/Task";
import {DataHandlerService} from "../../service/data-handler.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";


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

  private tasks: Task[]

  @Input('tasks')
  private set setTasks(tasks: Task[]) {
    this.tasks = tasks
    this.fillTable()
  }

  constructor(private dataHandler: DataHandlerService) {
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource()
    this.fillTable()
  }

  toggleTaskCompleted(task: Task) {
    task.completed = !task.completed
  }

  getPriorityColor(task: Task) {
    if (task.completed) {
      return '#F8F9FA'
    }

    if (task.priority && task.priority.color) {
      return task.priority.color
    }

    return '#fff'
  }

  private fillTable() {

    if(!this.dataSource) {
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
          return  task.category ? task.category.title : null
        }
        case 'date': {
          return  task.date ? task.date : null
        }
        case 'title': {
          return  task.title
        }
      }
    }
  }

  private addTableObjects() {
    this.dataSource.sort = this.sort
    this.dataSource.paginator = this.paginator
  }
}
