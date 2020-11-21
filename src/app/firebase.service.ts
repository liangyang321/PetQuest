import { Animal } from './animal.model';
import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase, snapshotChanges} from '@angular/fire/database';
import { User } from './user.model';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private dbPath = '/animals';
  // animialRef: AngularFireList<Animal> = null;
  animialRef: AngularFireList<any> = null;
  userRef: AngularFireList<User> = null;

  constructor(private db: AngularFireDatabase) {
    this.animialRef = db.list(this.dbPath);
    this.userRef = db.list('/users');
   }

  createAnimal(animal: Animal): any {
    return this.animialRef.push(animal);
  }

  // getAll(): AngularFireList<Animal>{
  //   return this.animialRef;
  // }
  getAllAnimals(): AngularFireList<any>{
    return this.animialRef;
  }

  updateAnimal(key: string, value: any): Promise<void>{
    return this.animialRef.update(key, value);
  }


  deleteAnimal(key: string): Promise<void>{
    return this.animialRef.remove(key);
  }


  // User
  createUser(user: User): any {
    return this.userRef.push(user);
  }

  getAllUsers(): AngularFireList<User>{
    return this.userRef;
  }

  updateUser(key: string, value: any): Promise<void>{
    return this.userRef.update(key, value);
  }


  deleteUser(key: string): Promise<void>{
    return this.userRef.remove(key);
  }
}
