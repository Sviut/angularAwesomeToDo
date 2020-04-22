import {CategoryDAO} from '../interface/CategoryDAO'
import {Observable, of} from 'rxjs'
import {Category} from '../../../model/Category'
import {TestData} from '../../TestData'

export class CategoryDAOArray implements CategoryDAO {

  add(category: Category): Observable<Category> {
    if (!category) {
      category.id = this.getLastCategoryId()
    }

    TestData.categories.push(category)

    return of(category)
  }

  getLastCategoryId(): number {
    return Math.max.apply(Math, TestData.categories.map(c => c.id)) + 1
  }

  delete(id: number): Observable<Category> {
    TestData.tasks.map(task => {
      return task.category?.id === id ? task.category = null : task
    })

    const tmpCategory = TestData.categories.find(c => c.id === id)
    TestData.categories.splice(TestData.categories.indexOf(tmpCategory), 1)
    return of(tmpCategory)
  }

  get(id: number): Observable<Category> {
    return undefined
  }

  getALl(): Observable<Category[]> {
    return of(TestData.categories)
  }

  search(title: string): Observable<Category[]> {
    return of(TestData.categories.filter(cat => cat.title.toUpperCase().includes(title.toUpperCase()))
      .sort((cat1, cat2) => cat1.title.localeCompare(cat2.title)))
  }

  update(category: Category): Observable<Category> {
    const tmpCategory = TestData.categories.find(c => c.id === category.id)

    TestData.categories.splice(TestData.categories.indexOf(tmpCategory), 1, category)

    return of(tmpCategory)
  }

}
