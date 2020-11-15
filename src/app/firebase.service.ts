import { Animal } from './animal.model';
import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase, snapshotChanges} from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private dbPath = '/animals';
  // animialRef: AngularFireList<Animal> = null;
  animialRef: AngularFireList<any> = null;

  constructor(private db: AngularFireDatabase) {
    this.animialRef = db.list(this.dbPath);
   }

  createAnimal(animal: Animal): any {
    return this.animialRef.push(animal);
  }

  // getAll(): AngularFireList<Animal>{
  //   return this.animialRef;
  // }
  getAll(): AngularFireList<any>{
    return this.animialRef;
  }

  update(key: string, value: any): Promise<void>{
    return this.animialRef.update(key, value);
  }


  delete(key: string): Promise<void>{
    return this.animialRef.remove(key);
  }
}
