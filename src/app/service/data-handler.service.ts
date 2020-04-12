import {Injectable} from '@angular/core';
import {Category} from '../model/Category';
import {TestData} from '../data/TestData';
import {Task} from "../model/Task";
import {BehaviorSubject, Observable} from "rxjs";
import {TaskDAOArray} from "../data/dao/impl/TaskDAOArray";
import {CategoryDAOArray} from "../data/dao/impl/CategoryDAOArray";

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  private taskDaoArray = new TaskDAOArray()
  private categoryDaoArray = new CategoryDAOArray()

  constructor() {
  }

  getAllTask(): Observable<Task[]> {
    return this.taskDaoArray.getALl()
  }

  getAllCategories(): Observable<Category[]> {
    return this.categoryDaoArray.getALl()
  }

}
