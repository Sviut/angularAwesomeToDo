import {Observable} from 'rxjs';

export interface CommonDAO<T> {

  add(T): Observable<T>;

  delete(id: number): Observable<T>;

  update(T): Observable<T>;

  get(id: number): Observable<T>;

  getALl(): Observable<T[]>;
}
