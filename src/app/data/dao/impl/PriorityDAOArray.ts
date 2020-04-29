import {PriorityDAO} from '../interface/PriorityDAO'
import {Observable, of} from 'rxjs'
import {Priority} from '../../../model/Priority'
import {TestData} from '../../TestData'
import {Task} from '../../../model/Task'

export class PriorityDAOArray implements PriorityDAO {

  private static getLastIdPriority(): number {
    return Math.max.apply(Math, TestData.priorities.map(priority => priority.id)) + 1
  }

  add(priority: Priority): Observable<Priority> {
    if (!priority.id) {
      priority.id = PriorityDAOArray.getLastIdPriority()
    }
    TestData.priorities.push(priority)
    return of(priority)
  }

  delete(id: number): Observable<Priority> {
    const tmpPriority = TestData.priorities.find(p => p.id === id)
    TestData.priorities.splice(TestData.priorities.indexOf(tmpPriority), 1)
    return of(tmpPriority)
  }

  get(id: number): Observable<Priority> {
    return undefined
  }

  getALl(): Observable<Priority[]> {
    return of(TestData.priorities)
  }

  update(priority: Priority): Observable<Priority> {
    const tmpPriority = TestData.priorities.find(p => p.id === priority.id)

    TestData.priorities.splice(TestData.priorities.indexOf(tmpPriority), 1, priority)
    return of(priority)
  }
}
