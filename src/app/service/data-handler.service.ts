import {Injectable} from '@angular/core'
import {Category} from '../model/Category'
import {Task} from '../model/Task'
import {Observable} from 'rxjs'
import {TaskDAOArray} from '../data/dao/impl/TaskDAOArray'
import {CategoryDAOArray} from '../data/dao/impl/CategoryDAOArray'
import {Priority} from '../model/Priority'
import {PriorityDAOArray} from '../data/dao/impl/PriorityDAOArray'

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  private taskDaoArray = new TaskDAOArray()
  private categoryDaoArray = new CategoryDAOArray()
  private priorityDaoArray = new PriorityDAOArray()

  constructor() {
  }

  getAllTask(): Observable<Task[]> {
    return this.taskDaoArray.getALl()
  }

  getAllCategories(): Observable<Category[]> {
    return this.categoryDaoArray.getALl()
  }

  getAllPriorities(): Observable<Priority[]> {
    return this.priorityDaoArray.getALl()
  }

  searchTasks(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]> {
    return this.taskDaoArray.search(category, searchText, status, priority)
  }

  updateTask(task: Task): Observable<Task> {
    return this.taskDaoArray.update(task)
  }

  delete(id: number): Observable<Task> {
    return this.taskDaoArray.delete(id)
  }

  updateCategory(category: Category): Observable<Category> {
    return this.categoryDaoArray.update(category)
  }

  deleteCategory(id: number): Observable<Category> {
    return this.categoryDaoArray.delete(id)
  }

  addTask(task: Task): Observable<Task> {
    return this.taskDaoArray.add(task)
  }

  addCategory(title: string): Observable<Category> {
    return this.categoryDaoArray.add(new Category(null, title))
  }

  searchCategory(title: string): Observable<Category[]> {
    return this.categoryDaoArray.search(title)
  }

  getCompletedCountInCategory(category: Category): Observable<number> {
    return this.taskDaoArray.getCompletedCountInCategory(category)
  }

  getUncompletedTotalCount(): Observable<number> {
    return this.taskDaoArray.getUncompletedCountInCategory(null)
  }

  getUncompletedCountInCategory(category: Category): Observable<number> {
    return this.taskDaoArray.getUncompletedCountInCategory(category)
  }

  getTotalCountInCategory(category: Category): Observable<number> {
    return this.taskDaoArray.getTotalCountInCategory(category)
  }

}
