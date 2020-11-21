import { Animal} from './animal.model';
import { Injectable } from '@angular/core';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {
  editPet = null;
  isEditUser = false;

  constructor() { }

  saveViewPet(sharedPet: Animal): void{
    sessionStorage.setItem('pet', JSON.stringify(sharedPet));
  }

  getViewPet(): any{
    console.log(JSON.parse(sessionStorage.getItem('pet')));
    return JSON.parse(sessionStorage.getItem('pet'));
  }

  saveCurrentUser(user: User): void{
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  getCurrentUser(): any{
    console.log(JSON.parse(sessionStorage.getItem('user')));
    return JSON.parse(sessionStorage.getItem('user'));
  }


}
