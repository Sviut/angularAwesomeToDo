import {Component, OnInit} from '@angular/core';
import {Task} from "../../model/Task";
import {DataHandlerService} from "../../service/data-handler.service";
import {MatTableDataSource} from "@angular/material/table";


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  tasks: Task[]
  displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category']
  dataSource: MatTableDataSource<Task>

  constructor(private dataHandler: DataHandlerService) {
  }

  ngOnInit(): void {
    this.dataHandler.taskSubject.subscribe(tasks => this.tasks = tasks)
    this.dataSource = new MatTableDataSource()

    this.refreshTable()
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

  private refreshTable() {
    this.dataSource.data = this.tasks
  }
}
