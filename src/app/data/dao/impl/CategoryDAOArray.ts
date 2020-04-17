import {CategoryDAO} from "../interface/CategoryDAO";
import {Observable, of} from "rxjs";
import {Category} from "../../../model/Category";
import {TestData} from "../../TestData";

export class CategoryDAOArray implements CategoryDAO{
  add(T): Observable<Category> {
    return undefined;
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
    return undefined;
  }

  getALl(): Observable<Category[]> {
    return of(TestData.categories);
  }

  search(title: string): Observable<Category[]> {
    return undefined;
  }

  update(category: Category): Observable<Category> {
    const tmpCategory = TestData.categories.find(c => c.id === category.id)

    TestData.categories.splice(TestData.categories.indexOf(tmpCategory), 1, category)

    return of(tmpCategory)
  }

}
