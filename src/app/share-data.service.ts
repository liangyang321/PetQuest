import {Animal} from './animal.model';
import {Injectable} from '@angular/core';
import {User} from './user.model';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {
  editPet = null;
  isEditUser = false;

  selectedUser = null;
  private subject = new Subject<any>();

  constructor() {
  }

  saveViewPet(sharedPet: Animal): void {
    sessionStorage.setItem('pet', JSON.stringify(sharedPet));
  }

  getViewPet(): any {
    return JSON.parse(sessionStorage.getItem('pet'));
  }

  saveCurrentUser(user: User): void {
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  getCurrentUser(): any {
    return JSON.parse(sessionStorage.getItem('user'));
  }


  sendClickEvent(): void {
    this.subject.next();
  }

  getClickEvent(): Observable<any> {
    return this.subject.asObservable();
  }


}
