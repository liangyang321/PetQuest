import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {User} from './user';

@Injectable({
  providedIn: 'root'
})
export class UserFirebaseService {
  private dbPath = '/users';
  userlist: AngularFireList<any> = null;

  constructor(private db: AngularFireDatabase) {
    this.userlist = db.list(this.dbPath);
  }

  createUser(user: User): any {
    return this.userlist.push(user);
  }

  getAll(): AngularFireList<any> {
    return this.userlist;
  }
}


