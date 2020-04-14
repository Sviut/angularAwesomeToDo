import {TaskDAO} from "../interface/TaskDAO";
import {Observable, of} from "rxjs";
import {Task} from 'src/app/model/Task';
import {Category} from "../../../model/Category";
import {Priority} from "../../../model/Priority";
import {TestData} from "../../TestData";

export class TaskDAOArray implements TaskDAO {
  add(T): Observable<Task> {
    return undefined;
  }

  delete(id: number): Observable<Task> {
    return undefined;
  }

  get(id: number): Observable<Task> {
    return undefined;
  }

  getALl(): Observable<Task[]> {
    return of(TestData.tasks);
  }

  getCompletedCountInCategory(category: Category): Observable<number> {
    return undefined;
  }

  getTotalCount(): Observable<number> {
    return undefined;
  }

  getTotalCountInCategory(category: Category): Observable<number> {
    return undefined;
  }

  getUncompletedCountInCategory(category: Category): Observable<number> {
    return undefined;
  }

  search(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]> {
    return of(this.searchTodos(category, searchText, status, priority))
  }

  private searchTodos(category: Category, searchText: string, status: boolean, priority: Priority) {
   let allTask = TestData.tasks

   if(category) {
     allTask = allTask.filter(todo => todo.category === category)
   }

   return allTask
  }

  update(task: Task): Observable<Task> {
    const tmpTask = TestData.tasks.find(t => t.id === task.id)

    TestData.tasks.splice(TestData.tasks.indexOf(tmpTask), 1, task)
    return of(task)
  }
}
