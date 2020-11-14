import { Animal } from './animal.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {
  editPet = null;

  constructor() { }

  saveViewPet(sharedPet: Animal): void{
    sessionStorage.setItem('pet', JSON.stringify(sharedPet));
  }

  getViewPet(): any{
    console.log(JSON.parse(sessionStorage.getItem('pet')));
    return JSON.parse(sessionStorage.getItem('pet'));
  }


}
