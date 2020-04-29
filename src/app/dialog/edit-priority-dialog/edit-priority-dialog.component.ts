import {Component, Inject, Input, OnInit} from '@angular/core'
import {OperType} from '../OperType'
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog'
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component'
import {SettingsDialogComponent} from '../settings-dialog/settings-dialog.component'

@Component({
  selector: 'app-edit-priority-dialog',
  templateUrl: './edit-priority-dialog.component.html',
  styleUrls: ['./edit-priority-dialog.component.scss']
})
export class EditPriorityDialogComponent implements OnInit {

  @Input()
  dialogTitle: string
  priorityTitle: string
  private operType: OperType

  constructor(
    private dialogRef: MatDialogRef<SettingsDialogComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private data: [string, string, OperType]) {
  }

  ngOnInit(): void {
    this.priorityTitle = this.data[0]
  }

  onConfirm() {
    this.dialogRef.close(this.priorityTitle)
  }

  onClose() {
    this.dialogRef.close(false)
  }

  canDelete() {
    return this.operType === OperType.EDIT
  }


  delete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Подтвердите дейтсвие',
        message: `Вы действительно хотите удалить приоритет: ${this.priorityTitle} ?`
      },
      autoFocus: false
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        dialogRef.close('delete')
      }
    })
  }
}
