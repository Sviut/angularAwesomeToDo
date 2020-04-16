import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Task} from "../../model/Task";
import {DataHandlerService} from "../../service/data-handler.service";
import {Category} from "../../model/Category";
import {Priority} from "../../model/Priority";

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.scss']
})
export class EditTaskDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EditTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: [Task, string],
    private dataHandler: DataHandlerService,
    private dialog: MatDialog
  ) { }

  categories: Category[]
  priorities: Priority[]

  task: Task
  dialogTitle: string
  tmpTitle: string
  tmpCategory: Category
  tmpPriority: Priority


  ngOnInit(): void {
    this.task = this.data[0]
    this.dialogTitle = this.data[1]

    this.tmpTitle = this.task.title
    this.tmpCategory = this.task.category
    this.tmpPriority = this.task.priority

    this.dataHandler.getAllCategories().subscribe(items => this.categories = items)
    this.dataHandler.getAllPriorities().subscribe(item => this.priorities = item)
  }

  onConfirm() {
    this.task.title = this.tmpTitle
    this.task.category = this.tmpCategory
    this.task.priority = this.tmpPriority

    this.dialogRef.close(this.task)
  }

  onCancel() {
    this.dialogRef.close(null)
  }
}
