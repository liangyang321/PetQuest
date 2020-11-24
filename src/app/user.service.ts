import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = 'http://jsonplaceholder.typicode.com/users';

  constructor(private httpClient: HttpClient) {
  }

  user: User[];

  getList(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.url);
  }
}


