
import {of as ObservableOf } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {map} from 'rxjs/operators';
import { AngularFireList, AngularFireDatabase, snapshotChanges} from '@angular/fire/database';
import { User } from './user';
@Injectable({
  providedIn: 'root'
})
export class UserFirebaseService {
  private dbPath = '/users';
  userlist: AngularFireList<any> = null;

  constructor(private db: AngularFireDatabase ){
    this.userlist = db.list(this.dbPath);
  }

  createUser(user: User): any{
    return this.userlist.push(user);
  }

  getAll(): AngularFireList<any>{
    return this.userlist;
  }
}


