import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {DataHandlerService} from 'src/app/service/data-handler.service'
import {Category} from 'src/app/model/Category'
import {EditCategoryDialogComponent} from '../../dialog/edit-category-dialog/edit-category-dialog.component'
import {MatDialog} from '@angular/material/dialog'
import {OperType} from '../../dialog/OperType'

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

  @Output()
  updateCategory = new EventEmitter<Category>()

  @Output()
  searchCategory = new EventEmitter<string>()

  @Output()
  deleteCategory = new EventEmitter<Category>()

  @Output()
  addCategory = new EventEmitter<string>()

  @Input()
  selectedCategory: Category

  indexMouseMove: number
  searchCategoryTitle: string

  constructor(
    private dataHandler: DataHandlerService,
    private dialog: MatDialog
  ) {
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

  showEditIcon(index: number) {
    this.indexMouseMove = index
  }

  openEditDialog(category: Category) {
    const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
      data: [category.title, 'Редактирование категории', OperType.EDIT],
      width: '400px'
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'delete') {
        this.deleteCategory.emit(category)
        return
      }

      if (typeof (result) === 'string') {
        category.title = result as string

        this.updateCategory.emit(category)
        return
      }
    })
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
      data: ['', 'Добавление категории', OperType.ADD],
      width: '400px'
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addCategory.emit(result as string)
      }
    })

  }

  search() {
    if (this.searchCategoryTitle != null) {
      this.searchCategory.emit(this.searchCategoryTitle)
    }
  }
}
